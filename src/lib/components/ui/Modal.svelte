<!-- Modal.svelte -->
<script>
  import { fade } from 'svelte/transition';
  
  export let isOpen = false;
  export let title = '';
  export let maxWidth = 'max-w-2xl'; // Customizable max-width
  export let padding = 'p-6';        // Customizable padding
  export let closeOnClickOutside = true;
  
  function closeModal() {
    if (closeOnClickOutside) {
      isOpen = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    on:click={closeModal} 
    transition:fade
  >
    <div 
      class="bg-white rounded-lg {padding} w-full {maxWidth} mx-4 max-h-[80vh] overflow-y-auto"
      on:click|stopPropagation
    >
      <div class="flex justify-between items-center mb-4">
        {#if title}
          <h2 class="text-xl font-semibold">{title}</h2>
        {:else}
          <div></div>
        {/if}
        <button 
          class="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none transition-colors"
          on:click={() => isOpen = false}
        >
          &times;
        </button>
      </div>
      
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
{/if}
