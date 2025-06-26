<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/utils/store';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';

  onMount(() => {
    if ($user?.profile?.role) {
      goto('/dashboard');
    }
  });
</script>

<svelte:head>
  <title>DocAppoint - Easy Appointment Management</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-gray-900">DocAppoint</h1>
        </div>
        <div class="flex items-center space-x-4">
          <Button href="/login?page=login" variant="primary">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Simplify Your
        <span class="text-blue-600">Appointment</span>
        Management
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        A hassle-free appointment management system for doctors and patients. 
        Book, manage, and track appointments with ease.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/login?page=login" size="lg" variant="primary">
          Get Started
        </Button>
        <Button href="#features" size="lg" variant="secondary">
          Learn More
        </Button>
      </div>
    </div>

    <!-- Features Section -->
    <section id="features" class="mt-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose DocAppoint?</h2>
        <p class="text-lg text-gray-600">Everything you need for efficient appointment management</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card title="Easy Authentication" subtitle="Multiple sign-in options">
          <div class="text-gray-600">
            <p>Sign in with SMS OTP or Google account. No complex passwords to remember.</p>
          </div>
        </Card>

        <Card title="Smart Slot Management" subtitle="For doctors">
          <div class="text-gray-600">
            <p>Set your availability, block slots, and manage your schedule with ease.</p>
          </div>
        </Card>

        <Card title="Patient-Friendly Booking" subtitle="For patients">
          <div class="text-gray-600">
            <p>Book appointments, view history, and manage your healthcare schedule.</p>
          </div>
        </Card>

        <Card title="Real-time Updates" subtitle="Stay informed">
          <div class="text-gray-600">
            <p>Get instant notifications about appointment status changes and updates.</p>
          </div>
        </Card>

        <Card title="Mobile Responsive" subtitle="Access anywhere">
          <div class="text-gray-600">
            <p>Use DocAppoint on any device - desktop, tablet, or mobile phone.</p>
          </div>
        </Card>

        <Card title="Secure & Reliable" subtitle="Your data is safe">
          <div class="text-gray-600">
            <p>Built with security in mind. Your medical information is protected.</p>
          </div>
        </Card>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="mt-24 text-center">
      <div class="bg-blue-600 rounded-2xl px-8 py-16 text-white">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl mb-8 opacity-90">
          Join thousands of doctors and patients using DocAppoint
        </p>
        <Button href="/login?page=login" size="lg" variant="secondary">
          Start Your Journey
        </Button>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h3 class="text-2xl font-bold mb-4">DocAppoint</h3>
        <p class="text-gray-400 mb-4">Making healthcare appointments simple and efficient</p>
        <p class="text-sm text-gray-500">
          © 2024 DocAppoint. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>