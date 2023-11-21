<!-- <script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';
  import type { iconType } from './Icon.svelte';
  import Icon from './Icon.svelte';

  interface $$Props extends HTMLInputAttributes {
    name: string;
    id?: string;
    label?: string;
    value: string | number;
    errorMessage?: string;
    type?: HTMLInputTypeAttribute;
  }

  export let name: string;
  export let id: string = crypto.randomUUID();
  export let leadingIcon: iconType | undefined = undefined;
  export let label: string | undefined = undefined;
  export let value: string | number;
  export let type: HTMLInputTypeAttribute = 'text';
</script>

<div class="flex flex-col gap-1">
  {#if label}
    <label for={id} class="text-sm ml-1 text-color">
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
      {id}
      {name}
      class="w-full h-full bg-transparent py-2 outline-none"
    />
  </div>

  {#if errorMe}
    <span class="text-red-600 text-xs ml-1 mt-1">
      {error}
    </span>
  {/if}
</div> -->

<script lang="ts">
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLInputAttributes {
    label?: string;
    id?: string;
    name: string;
    errorMessage?: string;
    value: string | number;
    type?: HTMLInputTypeAttribute;
  }

  export let label: string | undefined = undefined;
  export let id: string = crypto.randomUUID();
  export let name: string;
  export let errorMessage: string | undefined = undefined;
  export let value: string | number;
  export let type: HTMLInputTypeAttribute = 'text';

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
    <label for={id} class="text-sm ml-1 text-color">
      {label}
    </label>
  {/if}

  <div
    class={twMerge(
      'rounded-md dark:bg-shadeD400  ring-1 ring-gray-300 dark:ring-gray-500 flex items-center h-[40px] text-color relative focus-within:ring-2 focus-within:ring-gray-400 transition group',
      errorMessage && '!ring-red-600 ring-2'
    )}
  >
    {#if $$slots.prefix}
      <div class="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2">
        <slot name="prefix" />
      </div>
    {/if}

    {#if type === 'text'}
      <input bind:value type="text" on:input {...inputProps} />
    {:else if type === 'password'}
      <input bind:value type="password" on:input {...inputProps} />
    {:else if type === 'number'}
      <input bind:value type="number" on:input {...inputProps} />
    {/if}

    {#if $$slots.suffix}
      <div class="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2">
        <slot name="suffix" />
      </div>
    {/if}
  </div>

  {#if errorMessage}
    <span class="text-red-600 text-xs font-medium ml-1">
      {errorMessage}
    </span>
  {/if}
</div>
