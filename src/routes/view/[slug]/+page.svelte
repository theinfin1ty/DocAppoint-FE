<script>
  import { page } from '$app/stores';
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import ViewAppointment from '$lib/components/appointment/ViewAppointment.svelte';

  const id = $page.params.slug;
</script>
<Navbar />
<ViewAppointment appointmentId={id} />
<Footer />