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
  <title>Myomasafecure - Natural Healing Through Homeopathy</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">🌿</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Myomasafecure</h1>
        </div>
        <div class="flex items-center space-x-4">
          <Button href="/login?page=login" variant="primary">
            Make an Appointment
          </Button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Natural Healing Through
        <span class="text-green-600">Homeopathy</span>
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Experience gentle, effective, and holistic treatment with classical homeopathy. 
        Book your consultation today for personalized natural healing.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/login?page=login" size="lg" variant="primary">
          Make an Appointment
        </Button>
        <Button href="#benefits" size="lg" variant="secondary">
          Learn About Homeopathy
        </Button>
      </div>
    </div>

    <!-- Benefits Section -->
    <section id="benefits" class="mt-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Homeopathy?</h2>
        <p class="text-lg text-gray-600">Discover the natural path to wellness</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card title="Natural & Safe" subtitle="No side effects">
          <div class="text-gray-600">
            <p>Homeopathic remedies are made from natural substances and are completely safe for all ages, including infants and pregnant women.</p>
          </div>
        </Card>

        <Card title="Holistic Treatment" subtitle="Treats the whole person">
          <div class="text-gray-600">
            <p>Addresses not just symptoms but the root cause, considering your physical, mental, and emotional well-being.</p>
          </div>
        </Card>

        <Card title="Individualized Care" subtitle="Personalized treatment">
          <div class="text-gray-600">
            <p>Each treatment is tailored specifically to your unique symptoms, constitution, and health history.</p>
          </div>
        </Card>

        <Card title="Chronic Conditions" subtitle="Long-term relief">
          <div class="text-gray-600">
            <p>Effective for chronic ailments like allergies, arthritis, migraines, and digestive disorders.</p>
          </div>
        </Card>

        <Card title="Boosts Immunity" subtitle="Strengthens natural defenses">
          <div class="text-gray-600">
            <p>Enhances your body's natural healing ability and builds long-term immunity against diseases.</p>
          </div>
        </Card>

        <Card title="Cost Effective" subtitle="Affordable healthcare">
          <div class="text-gray-600">
            <p>Homeopathic treatment is economical and provides lasting results without expensive procedures.</p>
          </div>
        </Card>
      </div>
    </section>

    <!-- Conditions Treated -->
    <section class="mt-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
        <p class="text-lg text-gray-600">Comprehensive homeopathic care for various health concerns</p>
      </div>
      
      <div class="bg-white rounded-2xl p-8 shadow-lg">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl mb-3">🤧</div>
            <h3 class="font-semibold mb-2">Respiratory</h3>
            <p class="text-sm text-gray-600">Asthma, Allergies, Sinusitis, Bronchitis</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">🦴</div>
            <h3 class="font-semibold mb-2">Joint & Muscle</h3>
            <p class="text-sm text-gray-600">Arthritis, Back Pain, Sciatica, Fibromyalgia</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">🧠</div>
            <h3 class="font-semibold mb-2">Mental Health</h3>
            <p class="text-sm text-gray-600">Anxiety, Depression, Stress, Insomnia</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">👶</div>
            <h3 class="font-semibold mb-2">Children's Health</h3>
            <p class="text-sm text-gray-600">ADHD, Autism, Growth Issues, Behavioral Problems</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">👩</div>
            <h3 class="font-semibold mb-2">Women's Health</h3>
            <p class="text-sm text-gray-600">PCOS, Menstrual Issues, Menopause, Infertility</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">🌡️</div>
            <h3 class="font-semibold mb-2">Acute Conditions</h3>
            <p class="text-sm text-gray-600">Fever, Cold, Flu, Infections, Injuries</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">🍽️</div>
            <h3 class="font-semibold mb-2">Digestive</h3>
            <p class="text-sm text-gray-600">IBS, Acidity, Constipation, Ulcers</p>
          </div>
          <div class="text-center">
            <div class="text-3xl mb-3">💊</div>
            <h3 class="font-semibold mb-2">Chronic Diseases</h3>
            <p class="text-sm text-gray-600">Diabetes, Hypertension, Thyroid, Autoimmune</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="mt-24 text-center">
      <div class="bg-green-600 rounded-2xl px-8 py-16 text-white">
        <h2 class="text-3xl font-bold mb-4">Ready to Start Your Healing Journey?</h2>
        <p class="text-xl mb-8 opacity-90">
          Book your consultation today and experience the gentle power of homeopathy
        </p>
        <Button href="/login?page=login" size="lg" variant="secondary">
          Make an Appointment
        </Button>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex items-center justify-center space-x-3 mb-4">
          <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">🌿</span>
          </div>
          <h3 class="text-2xl font-bold">Myomasafecure</h3>
        </div>
        <p class="text-gray-400 mb-4">Natural healing through classical homeopathy</p>
        <p class="text-sm text-gray-500">
          © 2024 Myomasafecure. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</div>