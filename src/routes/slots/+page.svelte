<script>
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import SlotManagement from '$lib/components/doctor/SlotManagement.svelte';
  import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';
  import { goto } from '$app/navigation';

  onMount(() => {
    if (!$user?.profile?.role || $user.profile.role !== 'doctor') {
      goto('/dashboard');
    }
  });
</script>

<Navbar />
<div class="flex-grow">
  <SlotManagement />
</div>
<Footer />