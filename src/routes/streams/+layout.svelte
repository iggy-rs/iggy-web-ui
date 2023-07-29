<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import { getStreamsQuery } from '$lib/queries/getStreamsQuery';

  const streamsQuery = getStreamsQuery();
  $: ({ data, status } = $streamsQuery);
</script>

<div class="flex h-full">
  {#if status === 'success'}
    <div class="w-[300px] flex flex-col h-full bg-white border-r">
      <div class="p-7 py-4 border-b text-sm">
        <input placeholder="Search streams..." />
      </div>
      <ul class="overflow-auto">
        {#each data as { name, id, topicsCount, messagesCount, sizeBytes } (id)}
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
                <span class="text-xs">Size: {sizeBytes}</span>
                <span class="text-xs">Messages: {messagesCount}</span>
                <span class="text-xs">
                  Id: {id}
                </span>
              </div>
            </button>
          </li>
        {/each}
      </ul>
      <button
        on:click={() => openModal('addStreamModal', {})}
        class="flex gap-2 m-4 rounded-[4px] border-black border-2 px-5 py-2 items-center justify-center text-sm font-semibold transition-colors hover:bg-gray-200"
      >
        <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
        New stream
      </button>
    </div>
  {/if}

  <div class="flex-1">
    <slot />
  </div>
</div>
