<script lang="ts">
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Input from '../Input.svelte';
  import Select from '../Select.svelte';
  import Button from '../Button.svelte';
  import ModalBase from './ModalBase.svelte';
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import type { StreamDetails } from '$lib/domain/StreamDetails';
  import { fetchRouteApi } from '$lib/api/fetchRouteApi';
  import { intervalToDuration } from 'date-fns';
  import { durationFormatter } from '$lib/utils/formatters/durationFormatter';
  import { numberSizes } from '$lib/utils/constants/numberSizes';
  import { dataHas } from '$lib/utils/dataHas';
  import { invalidateAll } from '$app/navigation';
  import { showToast } from '../AppToasts.svelte';
  import { customInvalidateAll } from '../PeriodicInvalidator.svelte';
  import { type Message } from '../../domain/Message';

  export let closeModal: CloseModalFn;
  export let message: Message;
</script>

<ModalBase {closeModal} title="Message details">
  <div class="flex flex-col justify-start items-center h-[650px] w-[1000px] gap-4">
    <div class="grid grid-cols-[1fr,1fr,1fr] gap-x-1 mt-16">
      <p class="ml-1 text-sm text-color">
        {message.id}
      </p>
      <p></p>
      <p class="ml-1 text-sm text-color">
        {message.state}
      </p>
    </div>
    <div class="grid grid-cols-[1fr,1fr,1fr] gap-x-1 mt-16">
      <p class="ml-1 text-sm text-color">
        {message.checksum}
      </p>
      <p></p>
      <p class="ml-1 text-sm text-color">
        {message.header}
      </p>
    </div>
    <div class="grid grid-cols-[1fr,1fr,1fr] gap-x-1 mt-16">
      <p class="ml-1 text-sm text-color">
        {message.timestamp}
      </p>
      <p></p>
      <p class="ml-1 text-sm text-color">
        {message.header}
      </p>
    </div>
    
    <textarea cols="60" rows="10">
      {message.payload}
    </textarea>
  </div>
</ModalBase>
