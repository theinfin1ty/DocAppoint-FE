<script>
  import { page } from '$app/stores';
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import ViewAppointment from '$lib/components/appointment/ViewAppointment.svelte';
  import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';

  const id = $page.params.slug;

  onMount(() => {
    if (!$user?.profile?.role) {
      $user.profile = null;
      goto('/login?page=login')
    }
  });
</script>
<Navbar />
<div class="flex-grow">
  <ViewAppointment appointmentId={id} />
</div>
<Footer />