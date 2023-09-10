<script>
  import { goto } from '$app/navigation';
  import Navbar from '$lib/components/partials/Navbar.svelte';
  import Footer from '$lib/components/partials/Footer.svelte';
</script>
<Navbar />
  <div>
    <h1>Hello, This is Home Page</h1>
    <button on:click={() => { goto('/login?page=login') }}>Login</button><br>
    <h3>OR</h3>
    <button href="/login?page=register">Register</button><br>
  </div>
<Footer />