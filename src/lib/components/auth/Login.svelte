<script>
	import { onMount } from 'svelte';
	import { goto } from "$app/navigation";
	import { createQueryStore } from '$lib/utils/queryStore.js';
	import { loginWithEmailAndPassword } from '$lib/utils/firebase.js';
	import { user as userStore } from '$lib/utils/store.js';
	import { getUserProfile } from '$lib/api/user'

	const page = createQueryStore('page');
	const user = {
		email: '',
		password: '',
		confirmPassword: ''
	};

	onMount(() => {
		if (!$page) $page = 'login';
	});

	const handleLoginWithEmailAndPassword = async () => {
		await loginWithEmailAndPassword(
			user.email,
			user.password,
			async (res) => {
				$userStore = res;
				window.localStorage.setItem('authToken', $userStore?.accessToken)
				const userProfile = await getUserProfile(window);
				$userStore.profile = userProfile;
				goto('/dashboard');
			},
			(err) => {
				$userStore = null;
				window.localStorage.setItem('authToken', null);
				goto('/login?page=login');
			}
		);
	}
</script>

<div class="h-full w-full overflow-hidden">
	<div class="inset-0 mx-auto flex max-w-md items-center overflow-y-auto p-8">
		<div class="form-wrapper w-full py-6">
			<div class="tabs mb-6 mt-2 text-sm">
				<button
					on:click={() => {
						$page = 'login';
					}}
					class="btn-tab active m-0 border-b-4 border-blue-950 px-2 py-1.5 font-medium text-blue-950 {$page !=
					'login'
						? 'opacity-50'
						: ''}">Login With Existing Account</button
				>
				<button
					on:click={() => {
						$page = 'register';
					}}
					class="btn-tab active ml-2 border-b-4 border-blue-950 px-2 py-1.5 font-medium text-blue-950 {$page !=
					'register'
						? 'opacity-50'
						: ''}">Register New Account</button
				>
			</div>
			<div>
				{#if $page == 'login'}
					<form class="mb-3" on:submit|preventDefault={handleLoginWithEmailAndPassword}>
						<div class="mb-3">
							<label class="text-sm" for="email">Email</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="email"
								id="email"
								name="email"
								placeholder="you@example.com"
								bind:value={user.email}
								required
							/>
						</div>
						<div class="mb-3">
							<label class="text-sm" for="password">Password</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="password"
								id="password"
								name="password"
								bind:value={user.password}
								required
							/>
						</div>
						<div class="mb-3">
							<a class="text-blue-500 underline text-sm hover:text-blue-700" href="/forgot"
								>Forgot Password?</a
							>
						</div>
						<div class="flex justify-center items-center">
							<button
								class="border rounded-lg p-3 w-full bg-blue-500 text-white hover:bg-blue-700"
								type="submit">Login</button
							>
						</div>
					</form>
				{/if}
				{#if $page == 'register'}
					<form class="mb-3">
						<div class="mb-3">
							<label class="text-sm" for="email">Email</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="email"
								id="email"
								name="email"
								placeholder="you@example.com"
								required
							/>
						</div>
						<div class="mb-3">
							<label class="text-sm" for="password">Password</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="password"
								id="password"
								name="password"
								required
							/>
						</div>
						<div class="mb-3">
							<label class="text-sm" for="password">Confirm Password</label>
							<input
								class="block w-full p-2 border-gray-200 text-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
								type="password"
								id="confirm-password"
								name="confirm-password"
								required
							/>
						</div>
						<div class="flex justify-center items-center">
							<button
								class="border rounded-lg p-3 w-full bg-blue-500 text-white hover:bg-blue-700"
								type="submit">Register</button
							>
						</div>
					</form>
				{/if}
			</div>
			<!-- <div class="col-6 offset-3">
        <div class="mb-3">
            <a class="btn btn-danger" href="/google">Sign In with Google</a>
        </div>
      </div> -->
		</div>
	</div>
</div>

<style>
	input {
		border: 1px solid #ccc;
	}
</style>
