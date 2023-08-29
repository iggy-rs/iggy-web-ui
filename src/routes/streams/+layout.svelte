<script lang="ts" context="module">
  export const onStreamAdded = () => {};
</script>

<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import { getStreamsQuery } from '$lib/queries';
  import Button from '$lib/components/Button.svelte';
  import { tick } from 'svelte';

  $: streamsQuery = getStreamsQuery();
  $: ({ data } = $streamsQuery);

  let streamsList: HTMLUListElement;

  let searchQuery = '';
  // $: orderedData = (data || []).sort((a, b) => a.id - b.id);
  $: filteredData = (data || []).filter((stream) => stream.name.includes(searchQuery));

  $: if (data && data.length > 0 && $page.url.pathname === '/streams') {
    goto(`/streams/${data[0].id}`);
  }

  let filteredDataLength = 0;

  $: (async function () {
    if (!streamsList || filteredData.length === 0) return;
    if (filteredData.length === filteredDataLength + 1) {
      await tick();
      streamsList.scroll({ top: streamsList.scrollHeight, behavior: 'smooth' });
    }

    filteredDataLength = filteredData.length;
  })();
</script>

<div class="flex h-full">
  {#if data && !$page.url.pathname.includes('topics')}
    <div class="w-[290px] flex flex-col h-full border-r bg-shadeL200 dark:bg-shadeD900">
      <input
        bind:value={searchQuery}
        placeholder="Search streams..."
        class="outline-none p-7 py-6 border-b text-sm bg-transparent dark:text-white"
      />

      <ul class="overflow-auto" bind:this={streamsList}>
        {#each filteredData as { name, id, topicsCount, messagesCount, sizeBytes } (id)}
          {@const isActive = $page.params.streamId === id.toString()}
          <li class="last:mb-14">
            <a
              href="/streams/{id}/"
              class={twMerge(
                'flex w-full flex-col border-b gap-1 px-5 py-2 transition-colors  outline-none dark:text-white',
                isActive && 'bg-shadeL500 dark:bg-shadeD300',
                !isActive && 'dark:hover:bg-shadeD500'
              )}
            >
              <span
                class={twMerge(
                  'font-semibold text-base',
                  isActive ? 'text-black dark:text-white' : 'text-shadeL1000  dark:text-shadeD100'
                )}>{name}</span
              >
              <div class="grid grid-cols-2 w-full">
                <div class="flex flex-col items-start">
                  <span class="text-xs">
                    Id: {id}
                  </span>
                  <span class="text-xs">Size: {sizeBytes}</span>
                </div>

                <div class="flex flex-col items-start">
                  <span class="text-xs">Topics: {topicsCount}</span>
                  <span class="text-xs">Messages: {messagesCount}</span>
                </div>
              </div>
            </a>
          </li>
        {/each}
      </ul>

      {#if filteredData.length === 0}
        <div class="p-7 py-4 flex items-center justify-center text-sm text-gray-400">
          <em>No streams found.</em>
        </div>
      {/if}

      <Button variant="outlined" class="m-4" on:click={() => openModal('addStreamModal')}>
        <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
        New stream
      </Button>
    </div>
  {/if}

  <div class="flex-1">
    <slot />
  </div>
</div>
