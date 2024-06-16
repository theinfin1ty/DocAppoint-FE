<script>
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';
</script>

<Navbar />
<header class="bg-green-500 text-white p-4">
	<h1 class="text-2xl text-center">Myomasafecure</h1>
</header>

<div class="container mx-auto p-4 flex-1">
	<section class="mb-6">
		<h2 class="text-xl font-bold mb-2">Introduction</h2>
		<p>
			Homeopathy is a system of alternative medicine based on the principle of "like cures like." It
			was developed in the late 18th century by Samuel Hahnemann. The practice involves using highly
			diluted substances to trigger the body's natural healing processes.
		</p>
	</section>

	<section class="mb-6">
		<h2 class="text-xl font-bold mb-2">Benefits</h2>
		<p>Advocates of homeopathy claim that it can treat a wide range of conditions, including:</p>
		<ul class="list-disc pl-5">
			<li>Allergies</li>
			<li>Asthma</li>
			<li>Chronic fatigue syndrome</li>
			<li>Depression</li>
			<li>Digestive issues</li>
			<li>Headaches</li>
			<li>Rheumatoid arthritis</li>
		</ul>
	</section>

	<section class="mb-6">
		<h2 class="text-xl font-bold mb-2">Common Uses</h2>
		<p>Homeopathy is commonly used for:</p>
		<ul class="list-disc pl-5">
			<li>Acute conditions such as colds and flu</li>
			<li>Chronic conditions like eczema</li>
			<li>Pain management</li>
			<li>Boosting overall wellness</li>
		</ul>
	</section>

  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    <a href="/login">Book an appointment now</a>
  </button>
</div>
<Footer />
