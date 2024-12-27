<script lang="ts">
  import Button from '../Button.svelte';
  import { decoderRegistry } from './decoders/utils/decoderRegistry';
  import { decodeBase64 } from '$lib/utils/base64Utils';

  export let payload: string | undefined = undefined;
  export let codec: string | undefined = undefined;

  type ErrorState = { title: string; message: string };
  type DecodedState =
    | { status: 'idle' }
    | { status: 'error'; error: ErrorState }
    | { status: 'success'; content: string };

  let state: DecodedState = { status: 'idle' };
  let showRaw = false;

  function getError(
    type: 'no_payload' | 'no_codec' | 'unsupported_codec' | 'invalid_format'
  ): ErrorState {
    switch (type) {
      case 'no_payload':
        return {
          title: 'No payload',
          message: 'This message has no payload to decode'
        };
      case 'no_codec':
        return {
          title: 'No codec specified',
          message: 'Add "codec" header with one of supported formats: string, json, xml'
        };
      case 'unsupported_codec':
        return {
          title: 'Unsupported codec',
          message: `The specified codec ${codec} is not supported`
        };
      case 'invalid_format':
        return {
          title: 'Invalid format',
          message: `The payload is not valid ${codec?.toUpperCase()}`
        };
    }
  }

  function decode() {
    if (!payload) {
      state = { status: 'error', error: getError('no_payload') };
      return;
    }

    if (!codec) {
      state = { status: 'error', error: getError('no_codec') };
      return;
    }

    const decodedPayload = decodeBase64(payload);
    if (!decodedPayload) {
      state = { status: 'error', error: getError('invalid_format') };
      return;
    }

    const decoder = decoderRegistry.get(codec);
    if (!decoder) {
      state = { status: 'error', error: getError('unsupported_codec') };
      return;
    }

    const content = decoder.decode(decodedPayload);
    if (!content) {
      state = { status: 'error', error: getError('invalid_format') };
      return;
    }

    state = { status: 'success', content };
  }
</script>

{#if state.status === 'idle'}
  <Button variant="contained" on:click={decode}>Decode</Button>
{:else}
  {#if state.status === 'error'}
    <div class="bg-red-100 dark:bg-red-900 p-4 rounded-md w-full">
      <p class="font-bold">{state.error.title}</p>
      <p>{state.error.message}</p>
    </div>
  {/if}

  {#if state.status === 'success'}
    <p class="font-bold">Codec: {codec}</p>
    <div class="w-full mt-2">
      <pre class="bg-gray-100 dark:bg-gray-800 p-1 rounded-md overflow-auto"><code
          >{state.content}</code
        ></pre>
    </div>
  {/if}

  <div class="mt-4 mb-2">
    <Button variant="text" on:click={() => (showRaw = !showRaw)}>
      {showRaw ? 'Hide' : 'Show'} raw payload (base64)
    </Button>
  </div>

  {#if showRaw && payload}
    <div class="w-full">
      <pre
        class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto whitespace-pre-wrap break-all"><code
          >{payload}</code
        ></pre>
    </div>
  {/if}
{/if}
