<script lang="ts">
  import { page } from '$app/stores';
  import Loader from '$lib/components/Loader.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Table from '$lib/components/Table.svelte';
  import { goto } from '$app/navigation';
  import { getTopicDetailsQuery } from '$lib/queries';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';

  $: topicDetailsQuery = getTopicDetailsQuery(+$page.params.streamId, +$page.params.topicId);
  $: ({ data: topic, isLoading } = $topicDetailsQuery);

  $: prevPage = $page.url.pathname.split('/').slice(0, 3).join('/') + '/';

  const openTopicDetailsModal = () => openModal('topicSettingsModal', { topic: topic! });
</script>

{#if isLoading}
  <div class="p-7 h-full flex items-center justify-center">
    <Loader name="topic {$page.params.topicId}" />
  </div>
{/if}

{#if topic}
  <div class="h-full">
    <div class="h-[80px] flex text-xs items-center pl-2 pr-5">
      <Button variant="rounded" class="mr-5" on:click={() => goto(prevPage)}>
        <Icon name="arrowLeft" className="h-[40px] w-[30px]" />
      </Button>

      <h1 class="font-semibold text-xl text-color">Topic {topic.name}</h1>

      <Button variant="rounded" class="ml-3" on:click={openTopicDetailsModal}>
        <Icon name="settings" className="dark:text-white" />
      </Button>

      <div class="flex gap-3 ml-7">
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
    </div>

    <Table
      noDataMessage="This topic has no partitions yet."
      data={topic.partitions}
      colNames={{
        id: 'ID',
        currentOffset: 'Offset',
        segmentsCount: 'Segments',
        sizeBytes: 'Size'
      }}
    />
  </div>
{/if}
