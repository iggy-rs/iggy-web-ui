<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import Table from '$lib/components/Table.svelte';
  import { getStreamDetailsQuery } from '$lib/queries/getStreamDetailsQuery';

  $: streamDetailsQuery = getStreamDetailsQuery(+$page.params.streamId);
  $: ({ data: stream, isLoading } = $streamDetailsQuery);

  const openStreamSettingModal = () => openModal('streamSettingsModal', { stream: stream! });
  const openAddTopicModal = () => openModal('addTopicModal', { streamDetails: stream! });
</script>

{#if isLoading}
  <div class="p-7 h-full flex items-center justify-center">
    <Loader name="stream {$page.params.streamId}" />
  </div>
{/if}

{#if stream}
  <div class="h-full bg-bgSecondary">
    <div class="h-[80px] flex text-xs items-center px-7">
      <h1 class="font-semibold text-xl">Stream {stream.name}</h1>

      <Button variant="rounded" class="ml-3" on:click={openStreamSettingModal}>
        <Icon name="settings" />
      </Button>

      <div class="flex gap-3 ml-7">
        <div class="chip">
          <span>Size: {stream.sizeBytes}</span>
        </div>
        <div class="chip">
          <span>Messages: {stream.messagesCount}</span>
        </div>
        <div class="chip">
          <span>Topics: {stream.topicsCount}</span>
        </div>
      </div>

      <Button variant="contained" class="ml-auto" on:click={openAddTopicModal}>
        <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
        Add Topic
      </Button>
    </div>

    {#if stream.topicsCount === 0}
      <div class="flex items-center justify-center text-gray-400 mt-7">
        <em>This stream has no topics yet.</em>
      </div>
    {:else}
      <Table
        data={stream.topics}
        onRowClick={(topic) => goto(`/streams/${$page.params.streamId}/topics/${topic.id}`)}
        colNames={{
          id: 'ID',
          name: 'Name',
          messagesCount: 'Messages',
          partitionsCount: 'Partitions',
          sizeBytes: 'Size'
        }}
      />
    {/if}
  </div>
{/if}
