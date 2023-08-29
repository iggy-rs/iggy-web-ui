<script lang="ts">
  import Loader from '$lib/components/Loader.svelte';
  import { getStatsQuery } from '$lib/queries';

  $: statsQuery = getStatsQuery();
  $: ({ data: stats, isLoading } = $statsQuery);

  $: statsList = stats ? Object.values(stats).map((val) => val) : [];

  $: console.log(statsList);
</script>

<h1>Overview</h1>

{#if isLoading}
  <div class="p-7 h-full flex items-center justify-center">
    <Loader name="stats" />
  </div>
{/if}

<div class="max-h-screen overflow-auto">
  {#if stats}
    <div class="mx-auto max-w-2xl flex flex-col gap-2 text-color p-5 rounded-lg">
      {#each statsList as { name, value }, idx (idx)}
        <div class="flex gap-2 border-b p-4 justify-between">
          <span class="font-semibold">{name} </span>
          <span>{value}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
