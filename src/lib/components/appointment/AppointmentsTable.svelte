<script>
	import { onMount } from 'svelte';
	import moment from 'moment-timezone';

	export let pagination = { total: 0, count: 0, page: 1 };
	export let heading = '';
	export let appointments;
	export let caption = '';
	export let role = 'client';
	export let onAction = () => {};

	$: total = 0;
	$: count = 0;
	$: page = 1;

	$: start = 0;
	$: end = 0;
	onMount(() => {
		total = pagination.total;
		count = pagination.count;
		page = pagination.page;
		if (page > 1) {
			start = (page - 1) * 10 + 1;
			end = (page - 1) * 10 + count;
		} else {
			start = page - 1 + 1;
			end = page - 1 + count;
		}
	});
</script>

<div class="m-4 sm:m-10">
	<div class="relative overflow-x-auto sm:rounded-lg">
		<!-- <div class="flex items-center justify-between pb-4">
			<div class="relative">
				<div class="absolute pt-2 flex items-center pl-3 pointer-events-none">
					<svg
						class="w-5 h-5 text-gray-500"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/></svg
					>
				</div>
				<input
					type="text"
					id="table-search"
					class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search for items"
				/>
			</div>
			<div class="relative">
				<button
					id="dropdownRadioButton"
					data-dropdown-toggle="dropdownRadio"
					class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
					type="button"
				>
					<svg
						class="w-3 h-3 text-gray-500 mr-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
						/>
					</svg>
					Last 30 days
					<svg
						class="w-2.5 h-2.5 ml-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</button>
				<div
					id="dropdownRadio"
					class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
					data-popper-reference-hidden=""
					data-popper-escaped=""
					data-popper-placement="top"
					style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);"
				>
					<ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioButton">
						<li>
							<div class="flex items-center p-2 rounded hover:bg-gray-100">
								<input
									id="filter-radio-example-1"
									type="radio"
									value=""
									name="filter-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
								/>
								<label
									for="filter-radio-example-1"
									class="w-full ml-2 text-sm font-medium text-gray-900 rounded">Last day</label
								>
							</div>
						</li>
						<li>
							<div class="flex items-center p-2 rounded hover:bg-gray-100">
								<input
									checked=""
									id="filter-radio-example-2"
									type="radio"
									value=""
									name="filter-radio"
									class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
								/>
								<label
									for="filter-radio-example-2"
									class="w-full ml-2 text-sm font-medium text-gray-900 rounded">Last 7 days</label
								>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div> -->
		<!-- Header -->
		<div class="p-4 sm:p-5 text-lg font-semibold text-left text-gray-900 bg-white border-b">
			{heading}
			<p class="mt-1 text-sm font-normal text-gray-500">
				{!appointments?.length ? 'No appointments to show, schedule one now!' : caption}
			</p>
		</div>

		{#if appointments?.length}
			<!-- Desktop Table -->
			<div class="hidden md:block">
				<table class="w-full text-sm text-left text-gray-500">
					<thead class="text-xs text-gray-700 uppercase bg-gray-200">
						<tr>
							<th scope="col" class="px-6 py-3">Patient name</th>
							<th scope="col" class="px-6 py-3">Age</th>
							<th scope="col" class="px-6 py-3">Type</th>
							<th scope="col" class="px-6 py-3">Date</th>
							<th scope="col" class="px-6 py-3">Slot</th>
							<th scope="col" class="px-6 py-3">Status</th>
							<th scope="col" class="px-6 py-3">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each appointments as appointment}
							<tr class="bg-white border-b hover:bg-gray-100">
								<td class="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
									{appointment?.name}
								</td>
								<td class="px-6 py-4 capitalize">{appointment?.age}</td>
								<td class="px-6 py-4 capitalize">{appointment?.type}</td>
								<td class="px-6 py-4 capitalize">{moment(appointment?.date).format('LL')}</td>
								<td class="px-6 py-4 capitalize">{appointment?.slot}</td>
								<td class="px-6 py-4 capitalize">{appointment?.status}</td>
								<td class="px-6 py-4">
									<div class="flex gap-2">
										<a
											href={`/view/${appointment?._id}`}
											class="text-blue-600 hover:underline text-sm">View</a
										>
										{#if role === 'doctor' && (appointment?.status === 'confirmed' || appointment?.status === 'pending')}
											<button
												on:click={() => onAction('complete', appointment)}
												class="text-green-600 hover:underline text-sm font-medium"
											>
												Complete
											</button>
										{/if}
										{#if role === 'client' && (appointment?.status === 'confirmed' || appointment?.status === 'pending')}
											<button
												on:click={() => onAction('cancel', appointment)}
												class="text-red-600 hover:underline text-sm font-medium"
											>
												Cancel
											</button>
											<a
												href={`/new?appointmentId=${appointment._id}`}
												class="text-blue-600 hover:underline text-sm font-medium"
											>
												Edit
											</a>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Mobile Cards -->
			<div class="md:hidden space-y-4 p-4">
				{#each appointments as appointment}
					<div class="bg-white border rounded-lg p-4 shadow-sm">
						<div class="flex justify-between items-start mb-3">
							<h3 class="font-semibold text-gray-900 capitalize">{appointment?.name}</h3>
							<span class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 capitalize">
								{appointment?.status}
							</span>
						</div>
						<div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
							<div><span class="font-medium">Age:</span> {appointment?.age}</div>
							<div><span class="font-medium">Type:</span> {appointment?.type}</div>
							<div><span class="font-medium">Date:</span> {moment(appointment?.date).format('MMM DD')}</div>
							<div><span class="font-medium">Time:</span> {appointment?.slot}</div>
						</div>
						<div class="flex flex-wrap gap-2">
							<a
								href={`/view/${appointment?._id}`}
								class="text-blue-600 hover:underline text-sm font-medium">View</a
							>
							{#if role === 'doctor' && (appointment?.status === 'confirmed' || appointment?.status === 'pending')}
								<button
									on:click={() => onAction('complete', appointment)}
									class="text-green-600 hover:underline text-sm font-medium"
								>
									Complete
								</button>
							{/if}
							{#if role === 'client' && (appointment?.status === 'confirmed' || appointment?.status === 'pending')}
								<button
									on:click={() => onAction('cancel', appointment)}
									class="text-red-600 hover:underline text-sm font-medium"
								>
									Cancel
								</button>
								<a
									href={`/new?appointmentId=${appointment._id}`}
									class="text-blue-600 hover:underline text-sm font-medium"
								>
									Edit
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
		{#if appointments?.length}
		<nav
			class="flex flex-col sm:flex-row items-center justify-between pt-1 bg-gray-50 px-3 pb-3 gap-2"
			aria-label="Table navigation"
		>
			<span class="text-sm font-normal text-gray-500 text-center sm:text-left"
				>Showing <span class="font-semibold text-gray-900">{start}-{end}</span> of
				<span class="font-semibold text-gray-900">{total}</span></span
			>
			<div class="inline-flex">
				<button
					class="flex items-center border border-gray-300 justify-center px-3 sm:px-4 h-8 text-sm font-semibold rounded-l {page <=
					1
						? 'text-gray-300'
						: 'hover:bg-gray-300'}"
					disabled={page <= 1}
				>
					<svg
						class="w-3.5 h-3.5 mr-1 sm:mr-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
					<span class="hidden sm:inline">Prev</span>
				</button>
				<button
					class="flex items-center justify-center px-3 sm:px-4 h-8 text-sm font-semibold border border-gray-300 rounded-r {total <=
					10
						? 'text-gray-300'
						: 'hover:bg-gray-300'}"
					disabled={total <= 10}
				>
					<span class="hidden sm:inline">Next</span>
					<svg
						class="w-3.5 h-3.5 ml-1 sm:ml-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</button>
			</div>
		</nav>
		{/if}
	</div>
</div>
