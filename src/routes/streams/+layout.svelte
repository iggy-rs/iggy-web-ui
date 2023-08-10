<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { twMerge } from 'tailwind-merge';
  import { page } from '$app/stores';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import { getStreamsQuery } from '$lib/queries/getStreamsQuery';
  import Button from '$lib/components/Button.svelte';

  $: streamsQuery = getStreamsQuery();
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
                'flex w-full flex-col border-b gap-1 px-5 py-2 transition-colors hover:bg-gray-200 outline-none',
                $page.params.id === id.toString() && 'bg-gray-200'
              )}
              on:click={() => {
                goto(`/streams/${id}/`);
              }}
            >
              <span class="font-semibold text-base text-gray-600">{name}</span>
              <div class="flex gap-14">
                <div class="flex flex-col items-start">
                  <span class="text-xs">Topics: {topicsCount}</span>
                  <span class="text-xs">Messages: {messagesCount}</span>
                </div>

                <div class="flex flex-col items-start">
                  <span class="text-xs">
                    Id: {id}
                  </span>
                  <span class="text-xs">Size: {sizeBytes}</span>
                </div>
              </div>
            </button>
          </li>
        {/each}
      </ul>
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

<!-- 
on:click={() => openModal('addStreamModal', {})} -->
