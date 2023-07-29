<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';
  import { getStreamsQuery } from '$lib/queries/getStreamsQuery';

  const streamsQuery = getStreamsQuery();
  $: ({ data, status } = $streamsQuery);
</script>

<div class="flex items-center justify-center h-full">
  {#if status === 'pending'}
    <Loader name="streams" />
  {/if}
</div>
