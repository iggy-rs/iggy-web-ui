<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';

  const areStreamsLoading = true;
  const areStreamsEmpty = true;
</script>

<div class="flex items-center justify-center h-full">
  {#if areStreamsLoading}
    <Loader name="streams" />
  {:else if areStreamsEmpty}
    <em class="noData">No streams found.</em>
  {/if}
</div>
