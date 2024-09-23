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
			const response = await getAllAppointments(window, {
				type: 'upcoming'
			});
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

	const onAction = (action) => {};
</script>

<Navbar />
{#if loading}
	<Loader />
{/if}
<div>
	{#if appointments}
		{#if $user?.profile?.role == 'admin'}
			<AppointmentsTable {appointments} {onAction} {pagination} heading={'Upcoming Appointments'} />
		{:else}
			<AppointmentsTable {appointments} {onAction} {pagination} heading={'Upcoming Appointments'} />
		{/if}
	{/if}
</div>
<Footer />
