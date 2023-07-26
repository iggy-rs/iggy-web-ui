<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';
  import type { Stream } from '../../lib/types/Stream';
  import { goto } from '$app/navigation';

  import { browser } from '$app/environment';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  // import { openModal } from '$lib/components/Modals/AppModals.svelte';

  const query = '';

  const streams: Stream[] = Array(4)
    .fill(0)
    .map((_, idx) => ({
      id: idx,
      name: `Stream ${idx}`,
      topicsCount: Math.floor(Math.random() * 1500) + 20
    }));

  $: filteredStreams = streams.filter((s) =>
    s.name.toLowerCase().includes(query.toLocaleLowerCase())
  );

  //   $: (() => {
  //     if (!browser) return;
  //     streams.length && goto(`/streams/${streams[0].id.toString()}`);
  //   })();
</script>

<div class="min-h-screen h-screen border-r w-[250px] flex flex-col overflow-hidden">
  <div class="p-7 border-b text-sm">
    <input placeholder="Search streams..." />
  </div>
  <ul class="overflow-scroll">
    {#each filteredStreams as { name, id, topicsCount } (id)}
      <li>
        <button
          class={twMerge(
            'flex w-full flex-col border-b gap-1 px-5 py-2 transition-colors hover:bg-gray-200',
            $page.params.id === id.toString() && 'bg-gray-200'
          )}
          on:click={() => {
            goto(`/streams/${id}/`);
          }}
        >
          <span class="font-semibold text-base">{name}</span>
          <div class="flex flex-col items-start text-gray-600">
            <span class="text-xs">Topics: {topicsCount}</span>
            <span class="text-xs">
              Id: {id}
            </span>
          </div>
        </button>
      </li>
    {/each}
  </ul>

  <button
    on:click={() => openModal('addStreamModal', { test: 'asd' })}
    class="flex gap-2 m-4 mt-7 rounded-[4px] border-black border-2 px-5 py-2 items-center justify-center text-sm font-semibold transition-colors hover:bg-gray-200"
  >
    <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
    New stream
  </button>
</div>

<div class="flex-1 bg-bgSecondary">
  <slot />
</div>
