<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import DataOrEmptyMessage from '$lib/components/DataOrEmptyMessage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';
  import PromiseLoader from '$lib/components/PromiseLoader.svelte';
  import SortableList from '$lib/components/SortableList.svelte';
  import { typedRoute } from '$lib/types/appRoutes.js';

  export let data;
</script>

<PromiseLoader
  promise={data.streamed.streamDetails}
  let:resolvedData={streamDetails}
  loadingMessage="stream {$page.params.streamId}"
>
  <div class="h-[80px] flex flex-row text-xs items-center px-7">
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
        <span>Id: {streamDetails.id}</span>
      </div>
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

  <DataOrEmptyMessage data={streamDetails.topics} noDataMessage="This stream has no topics.">
    <SortableList
      rowClass="grid grid-cols-[150px_3fr_2fr_2fr_2fr_3fr]"
      data={streamDetails.topics}
      hrefBuilder={(topic) =>
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
  </DataOrEmptyMessage>
</PromiseLoader>
