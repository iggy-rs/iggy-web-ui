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
    id: z.coerce.number().min(1).max(255).default(0),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters')
      .default(''),
    partitionsCount: z.coerce.number().min(0).default(0)
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
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
    <Input
      label="Id"
      id="id"
      type="number"
      bind:value={$form.id}
      {...$constraints.id}
      error={$errors.id?.join(',')}
    />
    <Input label="Name" id="name" bind:value={$form.name} error={$errors.name?.join(',')} />

    <Input
      label="Partitions count"
      type="number"
      id="partitionsCount"
      bind:value={$form.partitionsCount}
      {...$constraints.partitionsCount}
      error={$errors.partitionsCount?.join(',')}
    />

    <div class="flex justify-end gap-3 mt-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={closeModal}>Cancel</Button>
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
