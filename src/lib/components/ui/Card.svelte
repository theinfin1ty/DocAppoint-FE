<script>
  export let title = '';
  export let subtitle = '';
  export let padding = 'p-6';
  export let shadow = 'shadow-md';
  export let rounded = 'rounded-lg';
  export let bgColor = 'bg-white';
</script>

<div class="{bgColor} {shadow} {rounded} {padding} border border-gray-200">
  {#if title || subtitle}
    <div class="mb-4">
      {#if title}
        <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="text-sm text-gray-600 mt-1">{subtitle}</p>
      {/if}
    </div>
  {/if}
  
  <slot></slot>
</div>