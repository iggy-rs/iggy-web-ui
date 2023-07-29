<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  import Icon from './Icon.svelte';
  import { twMerge } from 'tailwind-merge';

  export const dataRefetchIntervalS = writable(10);
  export const isAnyQueryLoading = writable(false);
</script>

<script lang="ts">
  let isSpinnerSpinning = false;
  let timer: number | undefined;

  $: if ($isAnyQueryLoading) {
    if (timer) clearTimeout(timer);
    isSpinnerSpinning = true;

    timer = setTimeout(() => {
      if (!$isAnyQueryLoading) isSpinnerSpinning = false;
    }, 500);
  }
</script>

<div class="ml-auto">
  <button class={twMerge(isSpinnerSpinning && 'spin')}>
    <Icon name="refresh" />
  </button>

  <div>
    <!-- <span>
      Refresh <span class="capitalize">{$currentQueryKey}</span> every:
    </span> -->

    Refresh every:
    <input type="number" bind:value={$dataRefetchIntervalS} class="w-[40px]" />
    seconds
  </div>
</div>

<style lang="postcss">
  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(-360deg);
    }
  }
</style>
