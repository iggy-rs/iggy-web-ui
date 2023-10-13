<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { Stream } from '$lib/domain/Stream';
  import { typedRoute } from '$lib/types/appRoutes.js';
  import PromiseLoader from '$lib/components/PromiseLoader.svelte';

  export let data;

  let searchQuery = '';
  let streamsData: Stream[] = [];

  $: filteredData = streamsData.filter((stream) => stream.name.includes(searchQuery));

  const onStreamsLoaded = (streams: Stream[]) => {
    streamsData = streams;

    if (streams.length > 0 && $page.url.pathname === typedRoute('/dashboard/streams')) {
      goto(typedRoute(`/dashboard/streams/${streamsData[0].id}`));
    }
  };
</script>

<PromiseLoader promise={data.streamed.streams} onData={onStreamsLoaded} loadingMessage="streams">
  <div class="flex h-full flex-row">
    <div class="w-[290px] border-r h-full bg-shadeL200 dark:bg-shadeD900 flex flex-col">
      <input
        bind:value={searchQuery}
        placeholder="Search streams..."
        class="outline-none p-7 py-5 border-b text-sm bg-transparent dark:text-white"
      />
      {#if filteredData.length === 0}
        <div class="p-7 py-4 flex items-center justify-center text-sm text-gray-400">
          <em>No streams found.</em>
        </div>
      {/if}

      <ul class="flex-1 overflow-auto">
        {#each filteredData as { name, id, topicsCount, messagesCount, sizeBytes } (id)}
          {@const isActive = $page.params.streamId === id.toString()}
          <li class="last:mb-6">
            <a
              href={typedRoute(`/dashboard/streams/${id}`)}
              class={twMerge(
                'flex w-full flex-col border-b gap-1 px-5 py-2 transition-colors  outline-none dark:text-white hoverable',
                isActive && 'bg-shadeL300 dark:bg-shadeD300'
              )}
            >
              <span
                class={twMerge(
                  'font-semibold text-base truncate',
                  isActive ? 'text-black dark:text-white' : 'text-shadeL1000  dark:text-shadeD100 '
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

      <Button variant="outlined" class="m-4" on:click={() => openModal('addStreamModal')}>
        <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
        New stream
      </Button>
    </div>
    <div class="w-[calc(100%-290px)] h-full overflow-hidden flex flex-col">
      <slot />
    </div>
  </div>
</PromiseLoader>
