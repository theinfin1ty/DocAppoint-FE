<script>
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let message = '';
  export let type = 'info'; // 'success', 'error', 'warning', 'info'
  export let duration = 3000;
  export let show = false;

  let timeout;

  $: if (show && duration > 0) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      show = false;
    }, duration);
  }

  onMount(() => {
    return () => clearTimeout(timeout);
  });

  const getTypeClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };
</script>

{#if show}
  <div
    class="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg {getTypeClasses(type)}"
    transition:fly={{ x: 300, duration: 300 }}
  >
    <span class="text-lg font-bold">{getIcon(type)}</span>
    <span class="font-medium">{message}</span>
    <button
      on:click={() => show = false}
      class="ml-2 text-lg font-bold opacity-70 hover:opacity-100"
    >
      ×
    </button>
  </div>
{/if}