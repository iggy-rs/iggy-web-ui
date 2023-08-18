<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import ModalBase from './ModalBase.svelte';
  import { createStreamMutation } from '$lib/mutations/createStreamMutation';

  export let closeModal: CloseModalFn;

  const schema = z.object({
    id: z.coerce.number().min(1).max(255).default(0).transform(String),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters')
      .default('')
  });

  const mutation = createStreamMutation();
  $: ({ data, isSuccess, error, variables, mutateAsync, isPending } = $mutation);

  $: console.log({ data, isSuccess, error, variables });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    taintedMessage: false,
    onError: () => {
      console.log('on error');
    },
    async onUpdate({ form }) {
      console.log('on update');
      if (form.valid) {
        const data = await mutateAsync({ id: +form.data.id, name: form.data.name });

        console.log(data);
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
      <Button type="submit" variant="contained" disabled={isPending} class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
