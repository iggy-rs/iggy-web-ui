<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLInputAttributes {
    checked: boolean;
    onChange?: (
      e: Event & {
        currentTarget: EventTarget & HTMLInputElement;
      }
    ) => void;
  }

  export let checked: $$Props['checked'];
  export let onChange: $$Props['onChange'] = undefined;

  let isMouseDown = false;
</script>

<div class="relative w-8 h-8">
  <input
    type="checkbox"
    bind:checked
    on:change={onChange}
    on:mousedown={() => (isMouseDown = true)}
    on:mouseup={() => (isMouseDown = false)}
    on:mouseleave={() => (isMouseDown = false)}
    on:mouseout={() => (isMouseDown = false)}
    on:blur={() => (isMouseDown = false)}
  />

  <div
    role="checkbox"
    tabindex="0"
    aria-checked={checked}
    class={twMerge(
      'w-5 h-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-neutral-300 border-2 rounded transition-all pointer-events-none',
      isMouseDown && 'scale-90'
    )}
  />

  <svg
    class="w-[18px] h-[18px] pointer-events-none transition-all scale-75 opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      d="M6 12L10.2426 16.2426L18.727 7.75732"
      stroke="#ffffff"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</div>

<style lang="postcss">
  input[type='checkbox'] {
    @apply cursor-pointer appearance-none m-0 absolute inset-0;
  }

  input[type='checkbox']:hover:not(:checked) + div {
    @apply border-neutral-400;
  }

  input[type='checkbox']:checked + div {
    @apply bg-[#32AD84];
  }

  input[type='checkbox']:checked + div + svg {
    @apply opacity-100 scale-100;
  }
</style>
