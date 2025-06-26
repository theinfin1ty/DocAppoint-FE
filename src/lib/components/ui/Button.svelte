<script>
  export let variant = 'primary'; // 'primary', 'secondary', 'danger', 'success'
  export let size = 'md'; // 'sm', 'md', 'lg'
  export let disabled = false;
  export let loading = false;
  export let type = 'button';
  export let href = null;

  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  $: classes = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    ${getVariantClasses(variant)} ${getSizeClasses(size)}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
  `.trim();
</script>

{#if href}
  <a {href} class={classes}>
    <slot></slot>
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot></slot>
  </button>
{/if}