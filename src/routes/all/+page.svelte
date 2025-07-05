<script>
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import { goto } from '$app/navigation';
	import AppointmentsTable from '$lib/components/appointment/AppointmentsTable.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';
	import { getAllAppointments } from '$lib/api/appointment';
	import Loader from '$lib/components/partials/Loader.svelte';

	$: appointments = null;
	$: pagination = {};
	let loading = true;

	const getAppointments = async () => {
		try {
			const response = await getAllAppointments(window, {});
			appointments = response.data;
			pagination = response.pagination;
			loading = false;
		} catch (error) {
			loading = false;
		}
	};

	onMount(async () => {
		if (!$user?.profile?.role) {
			$user.profile = null;
			goto('/login?page=login');
		}

		await getAppointments();
	});
</script>

<Navbar />
{#if loading}
	<Loader />
{/if}
<div class="flex-grow pb-8">
	{#if appointments}
		<AppointmentsTable {appointments} {pagination} heading={'All Appointments'} />
	{/if}
</div>
<Footer />
