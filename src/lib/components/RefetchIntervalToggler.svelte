<script lang="ts" context="module">
  import { useIsFetching, useQueryClient } from '@tanstack/svelte-query';
  import Icon from './Icon.svelte';
  import { twMerge } from 'tailwind-merge';
  import { writable } from 'svelte/store';

  export const dataRefetchIntervalS = writable(10);
</script>

<script lang="ts">
  import Button from './Button.svelte';

  const fetchingQueriesCount = useIsFetching();

  const queryClient = useQueryClient();

  let isSpinnerSpinning = false;
  let timer: number | undefined;

  $: if ($fetchingQueriesCount > 0) {
    if (timer) clearTimeout(timer);
    isSpinnerSpinning = true;

    timer = setTimeout(() => {
      if ($fetchingQueriesCount === 0) isSpinnerSpinning = false;
    }, 300);
  }
</script>

<Button variant="rounded" on:click={() => queryClient.refetchQueries({ type: 'active' })}>
  <div class={twMerge(isSpinnerSpinning && 'spin')}>
    <Icon name="refresh" />
  </div>
  <div slot="tooltip">Refresh</div>
</Button>

<style lang="postcss">
  .spin {
    animation: spin 0.3s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(-180deg);
    }
  }
</style>
