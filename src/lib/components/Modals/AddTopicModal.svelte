<script lang="ts">
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Input from '../Input.svelte';
  import Button from '../Button.svelte';
  import ModalBase from './ModalBase.svelte';
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import type { StreamDetails } from '$lib/domain/StreamDetails';

  export let closeModal: CloseModalFn;
  export let streamDetails: StreamDetails;

  const schema = z.object({
    topicId: z.number(),
    name: z.string()
  });

  const { form, errors, enhance } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    onSubmit: ({ data }) => {
      console.log(data);
    },
    onUpdate({ form }) {
      if (form.valid) {
        // TODO: Do something with the validated form.data
      }
    }
  });
</script>

<ModalBase {closeModal} title="Add topic">
  <form method="POST" class="flex flex-col h-[350px] gap-4" use:enhance>
    <Input label="Id" id="topicId" />
    <Input label="Name" id="name" />
    <Input label="Partitions count" type="number" id="partitionsCount" />

    <div class="flex justify-end gap-3 mt-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={closeModal}>Cancel</Button>
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
