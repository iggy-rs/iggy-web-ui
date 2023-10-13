<script lang="ts">
  import Loader from './Loader.svelte';

  type T = $$Generic;

  export let promise: Promise<T>;
  export let loadingMessage: string;
  export let onData: ((data: T) => void) | undefined = undefined;

  const tryCallOnData = (data: T) => {
    if (onData) onData(data);
  };

  let resolvedData: T | undefined = undefined;
  let isLoading = true;
  $: promise, (isLoading = true);

  $: promise.then((data) => {
    isLoading = false;
    resolvedData = data;
    tryCallOnData(data);
  });

  const typedData = (x: any) => x as Awaited<T>;
</script>

{#if isLoading}
  <div class=" mt-14 w-fit mx-auto">
    <Loader name={loadingMessage} />
  </div>
{:else}
  <slot resolvedData={typedData(resolvedData)} />
{/if}
