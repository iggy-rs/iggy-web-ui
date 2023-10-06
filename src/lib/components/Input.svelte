<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';
  import type { iconType } from './Icon.svelte';
  import Icon from './Icon.svelte';

  interface $$Props extends HTMLInputAttributes {
    idAndName: string;
    label?: string;
    value?: string | number;
    error?: string;
    leadingIcon?: iconType;
  }

  export let idAndName: string;
  export let leadingIcon: iconType | undefined = undefined;
  export let label: string | undefined = undefined;
  export let value: $$Props['value'] = undefined;
  export let error: $$Props['error'] = undefined;
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={idAndName} class="text-sm ml-1 text-color">
      {label}
    </label>
  {/if}

  <div
    class={twMerge(
      'rounded-md border border-gray-300 dark:border-none outline-none dark:bg-shadeD400 text-color px-3 w-full relative',
      error && 'border-red-600 text-red-600 border-none outline-red-600',
      leadingIcon && 'pl-8',
      $$restProps.class
    )}
  >
    {#if leadingIcon}
      <Icon
        name={leadingIcon}
        className="absolute text-gray-400 left-2 top-1/2 -translate-y-1/2 w-[18px]"
      />
    {/if}

    <input
      bind:value
      {...$$restProps}
      autocomplete="off"
      id={idAndName}
      name={idAndName}
      class="w-full h-full bg-transparent py-2 outline-none"
    />
  </div>

  {#if error}
    <span class="text-red-600 text-xs ml-1 mt-1">
      {error}
    </span>
  {/if}
</div>
