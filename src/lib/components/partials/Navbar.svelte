<script>
	import { user } from '$lib/utils/store';
	import { goto } from '$app/navigation';
	import { logout } from '$lib/utils/firebase';
</script>

<nav class="bg-gray-800">
	<div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5" />
					<span class="sr-only">Open main menu</span>
					<!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
					<svg
						class="block h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
					<svg
						class="hidden h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<a
						href={$user?.profile ? "/dashboard" : "/"}
						class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-base font-medium"
						>Mayomasafecure</a
					>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						{#if $user?.profile?.role == 'client' || $user?.profile?.role == 'doctor'}
							<a
								href="/dashboard"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>Upcoming Appointments</a
							>
							<a
								href="/all"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>All Appointments</a
							>
						{/if}
						{#if $user?.profile?.role == 'doctor'}
							<a
								href="/slots"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>Manage Slots</a
							>
						{/if}
						{#if $user?.profile?.role == 'client'}
							<a
								href="/new"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>New Appointment</a
							>
						{/if}
						{#if $user?.profile?.role == 'admin'}
							<a
								href="/users"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>All Users</a
							>
							<a
								href="/users/new"
								class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
								>Add User</a
							>
						{/if}
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Profile dropdown -->
				<div class="relative ml-3">
					{#if $user?.profile?.role}
						<a
							on:click={async () => {
								await logout();
								$user.profile = null;
								window.localStorage.setItem('authToken', null);
								window.localStorage.setItem('refreshToken', null);
								goto('/login?page=login');
							}}
							on:keydown={() => {}}
							href={'#'}
							class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
							>Logout</a
						>
					{:else}
						<a
							href="/login?page=login"
							class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
							>Login / Register</a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
