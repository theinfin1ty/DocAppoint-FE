<script>
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/utils/firebase';
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import { getUserProfile } from '$lib/api/user';
	import { goto } from '$app/navigation';
	import Toast from '$lib/components/ui/Toast.svelte';
	import { toastStore } from '$lib/utils/toast';

	onMount(async () => {
		const accessToken = window.localStorage.getItem('authToken');
		const refreshToken = window.localStorage.getItem('refreshToken');

		if (accessToken || refreshToken) {
			const userProfile = await getUserProfile();
			$user.profile = userProfile;
		} else {
			$user.profile = null;
			window.localStorage.removeItem('authToken');
			window.localStorage.removeItem('refreshToken');
		}
	});
</script>

<div class="min-h-screen flex flex-col">
	<slot />
</div>
<Toast bind:show={$toastStore.show} message={$toastStore.message} type={$toastStore.type} duration={$toastStore.duration} />
