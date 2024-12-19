<script lang="ts">
  import ModalBase from './ModalBase.svelte';
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { type Message } from '$lib/domain/Message';

  export let closeModal: CloseModalFn;
  export let message: Message;

  const formatHeaders = (headers: Record<string, string> | null | undefined) => {
    if (!headers || Object.keys(headers).length === 0) {
      return 'No headers';
    }
    try {
      return JSON.stringify(headers, null, 2);
    } catch {
      return 'Invalid headers format';
    }
  };
</script>

<ModalBase {closeModal} title="Message details" class="w-full max-w-[90vw] lg:max-w-[80vw]">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-6 h-full w-full overflow-auto">
    <div class="flex flex-col gap-4">
      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">ID</span>
        <span class="text-sm text-color font-medium">{message?.id ?? 'N/A'}</span>
      </div>

      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">Offset</span>
        <span class="text-sm text-color font-medium">{message?.offset ?? 'N/A'}</span>
      </div>

      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">State</span>
        <span class="text-sm text-color font-medium">{message?.state ?? 'N/A'}</span>
      </div>

      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">Checksum</span>
        <span class="text-sm text-color font-medium">{message?.checksum ?? 'N/A'}</span>
      </div>

      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">Timestamp</span>
        <span class="text-sm text-color font-medium">
          {message?.formattedTimestamp ?? 'N/A'}
          <span class="text-xs text-shadeL900 dark:text-shadeL700 ml-2">
            ({message?.timestamp ?? 'N/A'})
          </span>
        </span>
      </div>

      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">Headers</span>
        <span class="text-sm text-color font-medium font-mono whitespace-pre-wrap break-all">
          {formatHeaders(message?.headers)}
        </span>
      </div>
    </div>

    <div class="flex flex-col h-full">
      <div class="bg-shadeL200 dark:bg-shadeD400 p-3 lg:p-4 rounded-md flex-grow">
        <span class="text-xs text-shadeL900 dark:text-shadeL700 block mb-1">Payload (Base64)</span>
        <span class="text-sm text-color font-medium font-mono whitespace-pre-wrap break-all">
          {message?.payload ?? ''}
        </span>
      </div>
    </div>
  </div>
</ModalBase>
