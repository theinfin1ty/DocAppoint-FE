<script>
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
  import Login from '$lib/components/auth/Login.svelte';
</script>
<Navbar />
<div class="flex-grow">
  <Login />
</div>
<Footer />