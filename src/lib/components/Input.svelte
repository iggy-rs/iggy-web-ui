<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLInputAttributes {
    id: string;
    label: string;
    value?: string | number;
    error?: string;
  }

  export let id: $$Props['id'];
  export let label: $$Props['label'];
  export let value: $$Props['value'] = undefined;
  export let error: $$Props['error'] = undefined;
</script>

<div class="flex flex-col gap-1">
  <label for={id} class="text-sm ml-1">
    {label}
  </label>

  <input
    bind:value
    {...$$restProps}
    {id}
    class={twMerge(
      'rounded-md border border-gray-300 px-3 py-2 w-full',
      error && 'border-red-600 text-red-600 border-[1px] outline-red-600',
      $$restProps.class
    )}
  />

  {#if error}
    <span class="text-red-600 text-xs ml-1">
      {error}
    </span>
  {/if}
</div>
