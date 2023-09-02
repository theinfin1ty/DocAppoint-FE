<script>
  import Navbar from '$lib/partials/Navbar.svelte';
	import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';
  import { goto } from "$app/navigation";

  onMount(() => {
    if (!$user?.profile?.role) {
      $user = null;
      goto('/login?page=login')
    }
  });
</script>
<Navbar />
<div>
  <h1>This is Dashboard</h1>
</div>