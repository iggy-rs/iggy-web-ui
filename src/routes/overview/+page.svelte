<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';
  import { getStatsQuery } from '$lib/queries';

  $: statsQuery = getStatsQuery();
  $: ({ data: stats, isLoading } = $statsQuery);

  $: statsList = stats ? Object.values(stats).map((val) => val) : [];
</script>

{#if isLoading}
  <div class="p-7 h-full flex items-center justify-center">
    <Loader name="stats" />
  </div>
{/if}

<div class="h-full overflow-auto p-10">
  {#if stats}
    <div class="p-5 w-fit mx-auto rounded-md shadow-lg dark:border">
      <h1 class="mb-5 text-base text-color">System stats</h1>
      <div class="mx-auto max-w-2xl text-color grid gap-5 grid-cols-2 rounded-lg">
        {#each statsList as { name, value }, idx (idx)}
          <div class="flex gap-2 border rounded-lg p-4 items-center justify-between">
            <span class="text-sm">{name} </span>
            <span class="text-xs text-gray-600 dark:text-gray-300">{value}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
