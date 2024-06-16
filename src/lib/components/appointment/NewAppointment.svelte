<script>
	import * as moment from 'moment-timezone';
	import { createAppointment, getAppointment, updateAppointment } from '$lib/api/appointment';
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/partials/Loader.svelte';
	import { onMount } from 'svelte';

	export let appointmentId;
	let appointment = {};
	let showErrors = false;
	let loading = false;

	onMount(async () => {
		if (appointmentId) {
			await fetchAppointment();
		}

		if (appointment?.date) appointment.date = moment(appointment.date).format('YYYY-MM-DD');
	});

	const handleAppointmentSubmit = async () => {
		try {
			const { name, age, date, purpose } = appointment;
			if (!name || !age || !date || !purpose) {
				showErrors = true;
				return;
			}
			loading = true;
			if (appointment?._id) {
				await updateAppointment(window, appointment?._id, appointment);
			} else {
				await createAppointment(window, appointment);
			}
			loading = false;
			goto('/dashboard');
		} catch (error) {
			loading = false;
		}
	};

	const fetchAppointment = async () => {
		try {
			appointment = await getAppointment(window, appointmentId);
			loading = false;
		} catch (error) {
			console.log(error);
			loading = false;
		}
	};
</script>

{#if loading}
	<Loader />
{/if}
<div class="flex flex-col justify-center items-center mt-10">
	<h1 class="text-center text-2xl font-bold mb-6">
		{appointment?._id ? 'Update' : 'New'} Appointment
	</h1>
	<div class="w-6/12 mx-auto">
		<form on:submit|preventDefault={handleAppointmentSubmit} novalidate>
			<div class="mb-4">
				<label class="text-sm font-semibold" for="name">Patient Name:</label>
				<input
					class="border rounded px-3 py-2 w-full {showErrors && !appointment?.name
						? 'border-red-300'
						: 'border-gray-300'}"
					type="text"
					id="name"
					name="appointment[name]"
					required={true}
					bind:value={appointment.name}
				/>
				{#if showErrors && !appointment?.name}
					<p class="text-xs text-red-500">Patient's name is required</p>
				{/if}
			</div>
			<div class="mb-4">
				<label class="text-sm font-semibold" for="age">Age (in years):</label>
				<input
					class="border rounded px-3 py-2 w-full {showErrors && !appointment?.age
						? 'border-red-300'
						: 'border-gray-300'}"
					type="number"
					id="age"
					name="appointment[age]"
					required={true}
					bind:value={appointment.age}
				/>
				{#if showErrors && !appointment?.age}
					<p class="text-xs text-red-500">Patient's age is required</p>
				{/if}
			</div>
			<div class="mb-4">
				<label class="text-sm font-semibold" for="weight">Weight (in Kgs):</label>
				<input
					class="border border-gray-300 rounded px-3 py-2 w-full"
					type="number"
					id="weight"
					name="appointment[weight]"
					bind:value={appointment.weight}
				/>
			</div>
			<div class="flex flex-row mb-4 gap-5">
				<div class="w-1/3">
					<label class="text-sm font-semibold" for="date">Appointment Date:</label>
					<input
						class="border rounded px-3 py-2 w-full {showErrors && !appointment?.date
							? 'border-red-300'
							: 'border-gray-300'}"
						type="date"
						id="date"
						name="appointment[date]"
						min={moment().format('YYYY-MM-DD')}
						max={moment().add(10, 'days').format('YYYY-MM-DD')}
						required={true}
						bind:value={appointment.date}
					/>
					{#if showErrors && !appointment?.date}
						<p class="text-xs text-red-500">Appointment date is required</p>
					{/if}
				</div>
				<div class="w-1/3">
					<label for="slot" class="text-sm font-semibold">Time Slot:</label>
					<select
						class="border border-gray-300 bg-white rounded px-3 py-[10px] w-full"
						name="appointment[slot]"
						id="slot"
						required={true}
						bind:value={appointment.slot}
					>
						<option value="morning">Morning</option>
						<option value="evening">Evening</option>
					</select>
				</div>
				<div class="w-1/3">
					<label for="slot" class="text-sm font-semibold">Appointment Type:</label>
					<select
						class="border border-gray-300 bg-white rounded px-3 py-[10px] w-full"
						name="appointment[type]"
						id="type"
						required={true}
						bind:value={appointment.type}
					>
						<option selected value="new">New</option>
						<option value="follow-up">Follow-up</option>
					</select>
				</div>
			</div>
			<div class="mb-4">
				<label for="purpose" class="text-sm font-semibold">Purpose of visit:</label>
				<textarea
					class="border rounded px-3 py-2 w-full {showErrors && !appointment?.purpose
						? 'border-red-300'
						: 'border-gray-300'}"
					name="appointment[purpose]"
					id="purpose"
					cols="30"
					rows="5"
					required={true}
					bind:value={appointment.purpose}
				/>
				{#if showErrors && !appointment?.purpose}
					<p class="text-xs text-red-500">Purpose of visit is required</p>
				{/if}
			</div>
			<div class="mb-4 mt-10 flex justify-center">
				<button
					class="bg-blue-900 w-1/2 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
					type="submit">{appointment?._id ? 'Update' : 'Make'} Appointment</button
				>
			</div>
		</form>
	</div>
</div>
