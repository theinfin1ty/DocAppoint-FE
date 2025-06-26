<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createQueryStore } from '$lib/utils/queryStore.js';
	import {
		loginWithEmailAndPassword,
		getRecaptchaVerifier,
		loginWithPhoneNumber,
		loginWithGoogle
	} from '$lib/utils/firebase.js';
	import { user as userStore } from '$lib/utils/store.js';
	import { getUserProfile } from '$lib/api/user';
	import { initiateLogin, login } from '$lib/api/auth';

	let error = false;
	let success = null;
	const page = createQueryStore('page');
	const user = {
		phoneNumber: '',
		otp: ''
	};

	onMount(() => {
		if (!$page) $page = 'login';

		user.phoneNumber = '';
		user.otp = '';
		error = false;
		success = null;
	});

	const handleInitiateLogin = async () => {
		const response = await initiateLogin({
			phoneNumber: user.phoneNumber
		});

		if (!response) {
			error = true;
			return;
		}

		$page = 'verify';
	};

	const handleLogin = async () => {
		const response = await login({
			phoneNumber: user?.phoneNumber,
			otp: user?.otp
		});

		if (!response) {
			$userStore.profile = null;
			error = true;
			window.localStorage.setItem('authToken', null);
			goto('/login?page=login');
			return;
		}

		window.localStorage.setItem('authToken', response?.tokens?.accessToken);
		window.localStorage.setItem('refreshToken', response?.tokens?.refreshToken);
		const userProfile = await getUserProfile();
		$userStore.profile = userProfile;
		goto('/dashboard');
	};

	const handleGoogleLogin = async () => {
		loginWithGoogle(
			async (user) => {
				try {
					const idToken = await user.getIdToken();
					const response = await login({ idToken, provider: 'google' });
					
					if (response) {
						window.localStorage.setItem('authToken', response?.tokens?.accessToken);
						window.localStorage.setItem('refreshToken', response?.tokens?.refreshToken);
						const userProfile = await getUserProfile();
						$userStore.profile = userProfile;
						goto('/dashboard');
					} else {
						error = true;
					}
				} catch (err) {
					error = true;
				}
			},
			(error) => {
				console.error('Google login failed:', error);
				error = true;
			}
		);
	};
</script>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome to DocAppoint</h2>
			<p class="text-gray-600">Sign in to your account to continue</p>
		</div>
		<div class="bg-white rounded-lg shadow-md p-8">
			<div>
				{#if $page == 'login'}
					{#if error}
						<p class="text-sm text-red-500">Something went wrong</p>
					{/if}
					<form class="mb-3" on:submit|preventDefault={handleInitiateLogin}>
						<div class="mb-3">
							<label class="text-sm" for="phoneNumber">Phone Number</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="phone"
								id="phoneNumber"
								name="phoneNumber"
								placeholder="1234567890"
								bind:value={user.phoneNumber}
								required
							/>
						</div>
						<div class="flex justify-center items-center">
							<button
								id="login-submit"
								class="border rounded-lg p-3 w-full bg-blue-500 text-white hover:bg-blue-700 mb-3"
								type="submit">Send OTP</button
							>
						</div>
					</form>
					<!-- <div class="flex items-center my-4">
						<div class="flex-grow border-t border-gray-300"></div>
						<span class="px-3 text-gray-500 text-sm">OR</span>
						<div class="flex-grow border-t border-gray-300"></div>
					</div>
					<button
						type="button"
						on:click={handleGoogleLogin}
						class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						Continue with Google
					</button> -->
				{/if}
				{#if $page == 'verify'}
					{#if error}
						<p class="text-sm text-red-500">Something went wrong</p>
					{/if}
					<form class="mb-3" on:submit|preventDefault={handleLogin}>
						<div class="mb-3">
							<label class="text-sm" for="phoneNumber">Enter OTP</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="text"
								id="otp"
								name="otp"
								placeholder="XXXXXX"
								bind:value={user.otp}
								required
							/>
						</div>
						<div class="flex justify-center items-center">
							<button
								id="login-submit"
								class="border rounded-lg p-3 w-full bg-blue-500 text-white hover:bg-blue-700"
								type="submit">Proceed</button
							>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	input {
		border: 1px solid #ccc;
	}
</style>
