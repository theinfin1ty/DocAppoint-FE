<script>
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/utils/firebase';
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import { getUserProfile } from '$lib/api/user';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const accessToken = window.localStorage.getItem('authToken');
		const refreshToken = window.localStorage.getItem('refreshToken');

		if (accessToken || refreshToken) {
			const userProfile = await getUserProfile();

			$user.profile = userProfile;
			goto('/dashboard');
		} else {
			$user.profile = null;
			window.localStorage.setItem('authToken', null);
			goto('/login?page=login');
		}
	});
</script>

<slot />
