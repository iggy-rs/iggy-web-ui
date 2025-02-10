<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLInputAttributes {
    errorMessage?: string;
    id?: string;
    label?: string;
    name: string;
    options: Array<string>;
    type?: HTMLInputTypeAttribute;
    value: string | number;
  }

  export let label: string | undefined = undefined;
  export let id: string = crypto.randomUUID();
  export let name: string;
  export let errorMessage: string | undefined = undefined;
  export let value: string | number;
  export let options: Array<string>;

  const inputProps = {
    class: twMerge(
      'w-full px-4 h-full rounded-lg outline-none bg-transparent text-color',
      $$slots.prefix && 'pl-9',
      $$slots.suffix && 'pr-12'
    ),
    id,
    name,
    ...$$restProps
  };
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <label for={id} class="ml-1 text-sm text-color">
      {label}
    </label>
  {/if}

  <div
    class={twMerge(
      'rounded-md dark:bg-shadeD400  ring-1 ring-gray-300 dark:ring-gray-500 flex items-center h-[40px] text-color relative focus-within:ring-2 focus-within:ring-gray-400 transition group',
      errorMessage && '!ring-red-600 ring-2 '
    )}
  >
    {#if $$slots.prefix}
      <div class="absolute flex items-center justify-center -translate-y-1/2 left-2 top-1/2">
        <slot name="prefix" />
      </div>
    {/if}

    <select bind:value on:input {...inputProps}>
      {#each options as option}
        <option class="dark:bg-shadeD400 dark:text-white bg-white text-black">{option}</option>
      {/each}
    </select>

    {#if $$slots.suffix}
      <div class="absolute flex items-center justify-center -translate-y-1/2 right-2 top-1/2">
        <slot name="suffix" />
      </div>
    {/if}
  </div>

  {#if errorMessage}
    <span class="ml-1 text-xs font-medium text-red-600">
      {errorMessage}
    </span>
  {/if}
</div>
