<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import SortableList from '$lib/components/SortableList.svelte';
  import Paginator from '$lib/components/Paginator.svelte';

  export let data;
  $: topic = data.topic;
  $: partitionMessages = data.partitionMessages;
  $: prevPage = $page.url.pathname.split('/').slice(0, 6).join('/') + '/';

  let currentPage = 1;
  $: totalPages = Math.ceil(partitionMessages.currentOffset / data.pagination.count);

  async function loadPage(page: number) {
    const offset = (page - 1) * data.pagination.count;
    const url = new URL(window.location.href);
    url.searchParams.set('offset', offset.toString());
    await goto(url, { keepFocus: true, noScroll: true });
    currentPage = page;
  }

  function onPageChange(event: CustomEvent<number>) {
    const page = event.detail;
    loadPage(page);
  }
</script>

<div class="h-[80px] flex text-xs items-center pl-2 pr-5">
  <Button variant="rounded" class="mr-5" on:click={() => goto(prevPage)}>
    <Icon name="arrowLeft" class="h-[40px] w-[30px]" />
  </Button>

  <h1 class="text-xl font-semibold text-color">
    Messages for {topic.name}, partition {partitionMessages.partitionId}
  </h1>

  <div class="flex gap-3 ml-7">
    <div class="chip">
      <span>Messages: {partitionMessages.currentOffset}</span>
    </div>
  </div>
</div>

<div class="flex-1 overflow-auto">
  {#if partitionMessages.messages.length === 0}
    <div class="flex items-center justify-center h-full text-gray-400 text-xl">
      <em>No messages found.</em>
    </div>
  {:else}
    <SortableList
      emptyDataMessage="No messages found."
      rowClass="grid grid-cols-[150px_2fr_1fr_1fr_1fr]"
      data={partitionMessages.messages}
      onclickAction={(index) =>
        openModal('InspectMessage', { message: partitionMessages.messages[index] })}
      ariaRoleDescription="Display message details"
      colNames={{
        offset: 'Offset',
        truncatedPayload: 'Payload',
        timestamp: 'Timestamp',
        checksum: 'Checksum'
      }}
    />
  {/if}
</div>

<div class="mt-2 mb-2">
  <Paginator {currentPage} {totalPages} maxVisiblePages={5} on:pageChange={onPageChange} />
</div>
