<script>
	export let success, error, info;
</script>

<div>
	{#if success && success.length}
		<div class="bg-green-50 p-1">
			<p class="text-green-500">{success}}</p>
		</div>
	{/if}
	{#if error && error.length}
		<div class="bg-red-50 p-1">
			<p class="text-red-500">{error}}</p>
		</div>
	{/if}
	{#if info && info.length}
		<div class="bg-yellow-50 p-1">
			<p class="text-yellow-500">{info}}</p>
		</div>
	{/if}
</div>
