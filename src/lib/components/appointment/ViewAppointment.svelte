<script>
	import { getAppointment, updateAppointment } from '$lib/api/appointment';
	import Loader from '$lib/components/partials/Loader.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';
	import { goto } from '$app/navigation';
	import { user } from '$lib/utils/store';

	export let appointmentId;
	let loading = true;
	let started = false;
	$: appointment = {};

	onMount(async () => {
		await fetchAppointment();
	});

	const fetchAppointment = async () => {
		try {
			appointment = await getAppointment(window, appointmentId);
			loading = false;
		} catch (error) {
			loading = false;
		}
	};

	const handleAppointmentCancellation = async () => {
		try {
			loading = true;
			await updateAppointment(window, appointment?._id, { status: 'cancelled' });
			goto('/dashboard');
			loading = false;
		} catch (error) {
			loading = false;
		}
	};

	const handleAppointmentCompletion = async () => {
		try {
			loading = true;
			await updateAppointment(window, appointment?._id, {
				status: 'completed',
				remark: appointment?.remark
			});
			goto('/dashboard');
			loading = false;
		} catch (error) {
			loading = false;
		}
	};
</script>

{#if loading}
	<Loader />
{/if}
<div class="flex flex-col items-center space-y-4 mt-6 sm:mt-10 mx-4 pb-8">
	<h1 class="text-center text-xl sm:text-2xl mb-4 font-bold">Appointment Details</h1>
	<div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
		<div class="space-y-4">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Patient's Name</span>
					<p class="font-semibold capitalize">{appointment.name}</p>
				</div>
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Age</span>
					<p class="font-semibold">{appointment.age} years</p>
				</div>
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Weight</span>
					<p class="font-semibold">{appointment.weight} Kgs</p>
				</div>
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Date</span>
					<p class="font-semibold">{moment(appointment.date).format('LL')}</p>
				</div>
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Time Slot</span>
					<p class="font-semibold capitalize">{appointment.slot}</p>
				</div>
				<div class="bg-gray-50 p-3 rounded-lg">
					<span class="text-sm text-gray-600">Status</span>
					<p class="font-semibold text-red-500 capitalize">{appointment.status}</p>
				</div>
			</div>
			<div class="bg-gray-50 p-3 rounded-lg">
				<span class="text-sm text-gray-600">Purpose of visit</span>
				<p class="font-semibold">{appointment.purpose}</p>
			</div>
		</div>
		{#if $user?.profile?.role === 'doctor' && started && appointment.status !== 'completed'}
			<div class="mt-4">
				<label for="remarks" class="block text-sm font-medium text-gray-700 mb-2">Remarks:</label>
				<textarea
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					name="remarks"
					id="remarks"
					rows="4"
					placeholder="Enter your remarks or prescription here..."
					bind:value={appointment.remark}
				/>
			</div>
		{/if}
		{#if appointment.status == 'completed'}
			<div class="mt-4 bg-green-50 p-3 rounded-lg">
				<span class="text-sm text-gray-600">Remarks / Prescription</span>
				<p class="font-semibold">{appointment?.remark || 'Not Provided'}</p>
			</div>
		{/if}
		<div class="mt-6 pt-4 border-t border-gray-200">
			<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
				<button
					class="w-full sm:w-auto bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
					on:click={() => goto('/dashboard')}
				>Back to Dashboard</button>
				
				<div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
					{#if appointment?.status === 'active'}
						{#if $user?.profile?.role === 'doctor' && !started}
							<button
								class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
								on:click={() => started = true}
							>Start Appointment</button>
						{:else if $user?.profile?.role === 'client'}
							<button
								class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
								on:click={() => goto(`/new?appointmentId=${appointment._id}`)}
							>Edit Appointment</button>
						{/if}
						<button
							class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
							on:click={handleAppointmentCancellation}
						>{$user?.profile?.role === 'doctor' ? 'Reject' : 'Cancel'} Appointment</button>
					{/if}
					{#if $user?.profile?.role === 'doctor' && started && appointment?.status !== 'completed'}
						<button
							class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
							on:click={handleAppointmentCompletion}
						>Complete Appointment</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
