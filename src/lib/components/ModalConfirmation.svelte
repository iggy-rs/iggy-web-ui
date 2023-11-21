<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';

  export let open: boolean;

  const dispatch = createEventDispatcher<{ result: boolean }>();
</script>

{#if open}
  <div
    transition:fade={{ duration: 100 }}
    class="absolute z-40 bg-black opacity-40 backdrop-blur-xs rounded-2xl inset-0"
  />
  <div
    transition:fade={{ duration: 100 }}
    on:click={() => dispatch('result', false)}
    class="absolute z-40 backdrop-blur-xs rounded-2xl inset-3"
  />
  <div
    transition:slide={{ duration: 300 }}
    class="absolute bottom-0 left-0 right-0 flex flex-col z-50 items-center bg-shadeL100 dark:bg-shadeD700 pt-10 rounded-tl-2xl rounded-tr-2xl"
  >
    <h2 class="text-color font-semibold text-xl">Are you sure?</h2>
    <div class="flex gap-2 p-5 py-10 w-full">
      <Button variant="containedRed" class="flex-1" on:click={() => dispatch('result', true)}
        >Yes</Button
      >
      <Button variant="text" class="flex-1" on:click={() => dispatch('result', false)}>No</Button>
    </div>
  </div>
{/if}
