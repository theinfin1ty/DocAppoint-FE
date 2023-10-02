<script>
	import { getAppointment, updateAppointment } from '$lib/api/appointment';
	import Loader from '$lib/components/partials/Loader.svelte';
	import { onMount } from 'svelte';
	import * as moment from 'moment-timezone';
	import { goto } from '$app/navigation';
	import { user } from '$lib/utils/store';

	export let appointmentId;
	let loading = true;
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

	const handleAppointmentCompletion = async () => {
		try {
			loading = true;
			await updateAppointment(window, appointment?._id, { status: 'completed', remark: appointment?.remark });
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
<div class="flex flex-col items-center space-y-3 mt-10 mx-4">
	<h1 class="text-center text-2xl mb-3 font-bold">Appointment Details</h1>
	<div class="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3">
		<div class="mb-3">
			Patient's Name: <strong class="capitalize">{appointment.name}</strong>
		</div>
		<div class="mb-3">
			Age (in years): <strong>{appointment.age}</strong>
		</div>
		<div class="mb-3">
			Weight (in Kgs): <strong>{appointment.weight}</strong>
		</div>
		<div class="mb-3">
			Appointment Date: <strong>{moment(appointment.date).format('LL')}</strong>
		</div>
		<div class="mb-3">
			Time Slot: <strong class="capitalize">{appointment.slot}</strong>
		</div>
    <div class="mb-3">
			Appointment Status: <strong class="text-red-500 capitalize">{appointment.status}</strong>
		</div>
		<div class="mb-3">
			Purpose of visit: <strong>{appointment.purpose}</strong>
		</div>
		<div class="mb-3">
      <label for="purpose" class="">Remarks:</label>
      <textarea
        class="border rounded px-3 py-2 w-full border-gray-300"
        name="appointment[purpose]"
        id="purpose"
        cols="30"
        rows="3"
        required={true}
        bind:value={appointment.remark}
      />
    </div>
		<div
			class="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-3 sm:space-y-0"
		>
			<button
				class="border text-white bg-blue-600 py-2 px-3 rounded-md hover:bg-blue-700"
				on:click={() => {
					goto(`/dashboard`);
				}}>Back</button
			>
			<div class="space-x-6">
				<button
					class="border text-white bg-green-600 py-2 px-3 rounded-md hover:bg-green-700"
					on:click={() => {
						handleAppointmentCompletion();
					}}>Complete Appointment</button
				>
			</div>
		</div>
	</div>
</div>
