<script>
  import "../app.css";
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth } from '$lib/utils/firebase';
	import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';
  import { getUserProfile } from '$lib/api/user';
  import { goto } from "$app/navigation";

  onMount(() => {
    onAuthStateChanged(auth, async (fireUser) => {
      if(fireUser) {
        $user = fireUser;
        window.localStorage.setItem('authToken', $user?.accessToken)
        const userProfile = await getUserProfile(window);
				$user.profile = userProfile;
				goto('/dashboard');
      } else {
        $user = null;
        window.localStorage.setItem('authToken', null)
        goto('/');
      }
    })
  })
</script>
<slot />