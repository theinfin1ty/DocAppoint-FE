<script>
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import { goto } from '$app/navigation';
	import AppointmentsTable from '$lib/components/appointment/AppointmentsTable.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';
	import { getAllAppointments } from '$lib/api/appointment';
	import Loader from '$lib/components/partials/Loader.svelte';

	$: appointments = [];
	$: pagination = {};
	let loading = true;

	onMount(async () => {
		if (!$user?.profile?.role) {
			$user = null;
			goto('/login?page=login');
		}
	});

	const getAppointments = async () => {
		try {
			const response = await getAllAppointments(window, {
				type: 'upcoming'
			});
			appointments = response.data;
			pagination = response.pagination;
			loading = false;
		} catch (error) {
			console.log(error);
			loading = false;
		}
	};

	const onAction = (action) => {};
</script>

<Navbar />
{#if loading}
	<Loader />
{/if}
<div>
	{#if $user?.profile?.role == 'admin'}
		{#await getAppointments() then _}
			<AppointmentsTable {appointments} {onAction} {pagination} heading={'Upcoming Appointments'} />
		{/await}
	{:else}
		{#await getAppointments() then _}
			<AppointmentsTable {appointments} {onAction} {pagination} heading={'Upcoming Appointments'} />
		{/await}
	{/if}
</div>
<Footer />
