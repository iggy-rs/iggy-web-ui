<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import PromiseLoader from '$lib/components/PromiseLoader.svelte';
  import SortableList from '$lib/components/SortableList.svelte';

  export let data;

  $: prevPage = $page.url.pathname.split('/').slice(0, 4).join('/') + '/';
</script>

<PromiseLoader
  promise={data.streamed.topic}
  loadingMessage="topic {$page.params.topicId}"
  let:resolvedData={topic}
>
  <div class="h-[80px] flex text-xs items-center pl-2 pr-5">
    <Button variant="rounded" class="mr-5" on:click={() => goto(prevPage)}>
      <Icon name="arrowLeft" className="h-[40px] w-[30px]" />
    </Button>

    <h1 class="font-semibold text-xl text-color">Topic {topic.name}</h1>

    <Button
      variant="rounded"
      class="ml-3"
      on:click={() => openModal('topicSettingsModal', { topic })}
    >
      <Icon name="settings" />
      <div slot="tooltip">Settings</div>
    </Button>

    <div class="flex gap-3 ml-7">
      <div class="chip">
        <span>Id: {topic.id}</span>
      </div>
      <div class="chip">
        <span>Size: {topic.sizeBytes}</span>
      </div>
      <div class="chip">
        <span>Messages: {topic.messagesCount}</span>
      </div>
      <div class="chip">
        <span>Partitions: {topic.partitionsCount}</span>
      </div>
    </div>

    <div class="flex gap-2 ml-auto">
      {#if topic.partitions.length > 0}
        <Button variant="outlinedRed" on:click={() => openModal('deletePartitionsModal')}
          >Delete partitions</Button
        >
      {/if}
      <Button variant="contained" on:click={() => openModal('addPartitionsModal')}
        >Add partitions</Button
      >
    </div>
  </div>

  <SortableList
    rowClass="grid grid-cols-[150px_1fr_1fr_1fr_1fr]"
    data={topic.partitions}
    colNames={{
      id: 'ID',
      currentOffset: 'Offset',
      segmentsCount: 'Segments',
      sizeBytes: 'Size',
      createdAt: 'Created'
    }}
  />
</PromiseLoader>
