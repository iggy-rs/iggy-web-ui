<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import ModalBase from './ModalBase.svelte';

  export let closeModal: CloseModalFn;

  const schema = z.object({
    id: z.coerce.number().min(1).max(255).default(0),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters')
      .default('')
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    taintedMessage: false,
    onError: () => {
      console.log('on error');
    },
    onUpdate({ form }) {
      console.log('on update');
      if (form.valid) {
        console.log('form is valid');
        // TODO: Do something with the validated form.data
      }
    }
  });
</script>

<!-- <SuperDebug data={$form} /> -->

<ModalBase {closeModal} title="Add new stream">
  <form method="POST" class="flex flex-col h-[300px] gap-4" use:enhance>
    <Input
      label="Id"
      id="id"
      bind:value={$form.id}
      type="number"
      {...$constraints.id}
      error={$errors.id?.join(',')}
    />
    <Input label="Name" id="name" bind:value={$form.name} error={$errors.name?.join(',')} />

    <div class="flex justify-end gap-3 mt-auto">
      <Button type="button" variant="text" class="w-2/5" on:click={closeModal}>Cancel</Button>
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
