<script lang="ts">
  import { dataRefetchIntervalS, isAnyQueryLoading } from '$lib/stores/dataFetchingStore';
  import Icon from './Icon.svelte';
  import { twMerge } from 'tailwind-merge';

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
