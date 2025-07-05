<script>
  import { page } from '$app/stores';
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import StartAppointment from '$lib/components/appointment/StartAppointment.svelte';
  import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';

  const id = $page.params.slug;

  onMount(() => {
    if (!$user?.profile?.role === 'doctor') {
      $user.profile = null;
      goto('/login?page=login')
    }
  });
</script>
<Navbar />
<div class="flex-grow">
  <StartAppointment appointmentId={id} />
</div>
<Footer />