<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Loader from '$lib/components/Loader.svelte';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import Table from '$lib/components/Table.svelte';
  import { typedRoute } from '$lib/types/appRoutes.js';

  export let data;
</script>

{#await data.streamed.streamDetails}
  <div class="p-7 h-full flex items-center justify-center">
    <Loader name="stream {$page.params.streamId}" />
  </div>
{:then streamDetails}
  <div class="h-full overflow-auto pb-10">
    <div class="h-[80px] flex text-xs items-center px-7">
      <h1 class="font-semibold text-xl dark:text-white max-w-[380px] break-words line-clamp-3">
        Stream {streamDetails.name}
      </h1>

      <Button
        variant="rounded"
        class="ml-3"
        on:click={() => openModal('streamSettingsModal', { stream: streamDetails })}
      >
        <Icon name="settings" className="dark:text-white" />
        <div slot="tooltip">Settings</div>
      </Button>

      <div class="flex gap-3 ml-7">
        <div class="chip">
          <span>Size: {streamDetails.sizeBytes}</span>
        </div>
        <div class="chip">
          <span>Messages: {streamDetails.messagesCount}</span>
        </div>
        <div class="chip">
          <span>Topics: {streamDetails.topicsCount}</span>
        </div>
      </div>

      <Button
        variant="contained"
        class="ml-auto"
        on:click={() => openModal('addTopicModal', { streamDetails })}
      >
        <Icon name="plus" className="w-[16px] h-[16px]" strokeWidth={2} />
        Add Topic
      </Button>
    </div>

    <Table
      noDataMessage="This stream has no topics yet."
      data={streamDetails.topics}
      rowHref={(topic) =>
        typedRoute(`/dashboard/streams/${+$page.params.streamId}/topics/${topic.id}`)}
      colNames={{
        id: 'ID',
        name: 'Name',
        messagesCount: 'Messages',
        partitionsCount: 'Partitions',
        sizeBytes: 'Size',
        createdAt: 'Created'
      }}
    />
  </div>
{/await}
