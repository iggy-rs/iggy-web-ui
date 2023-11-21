<script lang="ts" context="module">
  import { browser } from '$app/environment';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Button from './Button.svelte';
  import { twMerge } from 'tailwind-merge';
  import Icon from './Icon.svelte';

  const isInvalidating = writable(false);
  const isInvalidatingClampMin = writable(false);
  export const invalidateIntervalDuration = writable(4000);

  export async function customInvalidateAll() {
    if (!browser) return;
    isInvalidating.set(true);
    await invalidateAll();
    isInvalidating.set(false);
  }
</script>

<script lang="ts">
  let timeout: number | undefined;

  $: if ($isInvalidating) {
    if (timeout) clearTimeout(timeout);
    $isInvalidatingClampMin = true;

    timeout = setTimeout(() => {
      if (!$isInvalidating) $isInvalidatingClampMin = false;
    }, 320);
  }
  let invalidateInterval: number | undefined;
  $: {
    if (invalidateInterval) clearInterval(invalidateInterval);
    invalidateInterval = setInterval(() => {
      customInvalidateAll();
    }, $invalidateIntervalDuration);
  }

  onMount(() => {
    return () => {
      clearInterval(invalidateInterval);
      clearTimeout(timeout);
    };
  });
</script>

<Button variant="rounded" on:click={customInvalidateAll}>
  <div class={twMerge($isInvalidatingClampMin && 'spin')}>
    <Icon name="refresh" class=" dark:stroke-white" />
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
