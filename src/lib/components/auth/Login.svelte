<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createQueryStore } from '$lib/utils/queryStore.js';
	import {
		loginWithEmailAndPassword,
		getRecaptchaVerifier,
		loginWithPhoneNumber
	} from '$lib/utils/firebase.js';
	import { user as userStore } from '$lib/utils/store.js';
	import { getUserProfile, registerUser, initiateForgotPassword } from '$lib/api/user';
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
</script>

<div class="h-full w-full overflow-hidden">
	<div class="inset-0 mx-auto flex max-w-md items-center overflow-y-auto p-8">
		<div class="form-wrapper w-full py-6">
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
								class="border rounded-lg p-3 w-full bg-blue-500 text-white hover:bg-blue-700"
								type="submit">Proceed</button
							>
						</div>
					</form>
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
