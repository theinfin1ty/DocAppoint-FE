<script>
  import Navbar from '$lib/components/partials/Navbar.svelte';
	import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';
  import { goto } from "$app/navigation";
  import NewAppointment from '$lib/components/appointment/NewAppointment.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import { createQueryStore } from '$lib/utils/queryStore.js';

  const appointmentId = createQueryStore('appointmentId');

  onMount(() => {
    if (!$user?.profile?.role) {
      $user.profile = null;
      goto('/login?page=login')
    }
  });

</script>
<Navbar />
<div>
  <NewAppointment appointmentId={$appointmentId} />
</div>
<Footer />