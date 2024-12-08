<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import { goto } from '$app/navigation';
  import { typedRoute } from '$lib/types/appRoutes.js';
  import { openModal } from '$lib/components/Modals/AppModals.svelte';

  import SortableList from '$lib/components/SortableList.svelte';

  export let data;
  $: messages = data.messages;
  $: topic = data.topic;
  $: prevPage = $page.url.pathname.split('/').slice(0, 6).join('/') + '/';
</script>

<div class="h-[80px] flex text-xs items-center pl-2 pr-5">
  <Button variant="rounded" class="mr-5" on:click={() => goto(prevPage)}>
    <Icon name="arrowLeft" class="h-[40px] w-[30px]" />
  </Button>

  <h1 class="text-xl font-semibold text-color">Messages for {topic.name}</h1>

  <div class="flex gap-3 ml-7">
    <div class="chip">
      <span>Messages: {topic.messagesCount}</span>
    </div>
  </div>
</div>

<SortableList
  emptyDataMessage="No messages found."
  rowClass="grid grid-cols-[110px_2fr_1fr_1fr_1fr_1fr]"
  data={data.messages}
  onclickAction={(index) => 
    openModal('InspectMessage', { message: data.messages[index] })
  }
  colNames={{
    offset: "Offset",
    truncatedPayload: "Payload",
    timestamp: "timestamp",
    checksum: "Checksum",
    header: "Headers",
  }}
/>
