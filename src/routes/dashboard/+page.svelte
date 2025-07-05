<script>
	import Navbar from '$lib/components/partials/Navbar.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';
	import { goto } from '$app/navigation';
	import AppointmentsTable from '$lib/components/appointment/AppointmentsTable.svelte';
	import Footer from '$lib/components/partials/Footer.svelte';
	import { getAllAppointments, updateAppointment } from '$lib/api/appointment';
	import Loader from '$lib/components/partials/Loader.svelte';
	import { showToast } from '$lib/utils/toast';

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

	const onAction = async (action, appointment) => {
		if (action === 'complete') {
			const response = await updateAppointment(window, appointment._id, { status: 'completed' });
			if (response) {
				showToast('Appointment marked as completed', 'success');
				await getAppointments();
			} else {
				showToast('Failed to complete appointment', 'error');
			}
		} else if (action === 'cancel') {
			const response = await updateAppointment(window, appointment._id, { status: 'cancelled' });
			if (response) {
				showToast('Appointment cancelled successfully', 'success');
				await getAppointments();
			} else {
				showToast('Failed to cancel appointment', 'error');
			}
		}
	};
</script>

<Navbar />
{#if loading}
	<Loader />
{/if}
<div class="flex-grow pb-8">
	{#if appointments}
		<AppointmentsTable {appointments} {onAction} {pagination} heading={'Upcoming Appointments'} role={$user?.profile?.role} />
	{/if}
</div>
<Footer />
