<script lang="ts" context="module">
  import { useIsFetching, useQueryClient } from '@tanstack/svelte-query';
  import Icon from './Icon.svelte';
  import { twMerge } from 'tailwind-merge';
  import { writable } from 'svelte/store';

  export const dataRefetchIntervalS = writable(10);
</script>

<script lang="ts">
  const fetchingQueriesCount = useIsFetching();

  const queryClient = useQueryClient();

  let isSpinnerSpinning = false;
  let timer: number | undefined;

  $: if ($fetchingQueriesCount > 0) {
    if (timer) clearTimeout(timer);
    isSpinnerSpinning = true;

    timer = setTimeout(() => {
      if ($fetchingQueriesCount === 0) isSpinnerSpinning = false;
    }, 500);
  }
</script>

<div class="ml-auto">
  <button
    class={twMerge(isSpinnerSpinning && 'spin')}
    on:click={() => queryClient.refetchQueries({ type: 'active' })}
  >
    <Icon name="refresh" />
  </button>

  <div>
    Refresh every: 10 seconds
    <!-- <input type="number" bind:value={$dataRefetchIntervalS} class="w-[40px]" />
    seconds {$dataRefetchIntervalS} -->
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
