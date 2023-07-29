<script lang="ts">
  import { page } from '$app/stores';
  import { getStreamDetailsQuery } from '$lib/queries/getStreamDetailsQuery';

  $: streamDetailsQuery = getStreamDetailsQuery(+$page.params.id);
  $: ({ data, status } = $streamDetailsQuery);
</script>

<div class="p-7">
  {#if status === 'pending'}
    fetching stream {$page.params.id}
  {:else}
    <span>
      {JSON.stringify(data)}
    </span>
  {/if}
</div>
