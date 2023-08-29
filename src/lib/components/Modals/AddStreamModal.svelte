<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Button from '../Button.svelte';
  import Input from '../Input.svelte';
  import ModalBase from './ModalBase.svelte';
  import { apiClient } from '$lib/utils/apiClient';
  import { showToast } from '../AppToasts.svelte';
  import { useQueryClient } from '@tanstack/svelte-query';

  export let closeModal: CloseModalFn;

  const clientQuery = useQueryClient();

  const schema = z.object({
    stream_id: z.coerce.number().min(1).max(255).default(0).transform(String),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters')
      .default('')
  });

  const { form, errors, enhance, constraints, submitting } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    taintedMessage: false,
    async onUpdate({ form }) {
      if (!form.valid) return;

      const result = await apiClient.post({
        path: '/streams',
        body: { stream_id: +form.data.stream_id, name: form.data.name }
      });

      if (result.success) {
        await clientQuery.refetchQueries({ queryKey: ['streams'] });
        closeModal();
        showToast({
          type: 'success',
          title: 'Success',
          description: 'Stream added successfully',
          delay: 250
        });
        return;
      }

      const { error } = result;
      if ('field' in error && 'reason' in error) {
        setError(form, error.field as any, error.reason as any);
      }
    }
  });
</script>

<ModalBase {closeModal} title="Add new stream">
  <form method="POST" class="flex flex-col h-[300px] gap-4" use:enhance>
    <Input
      label="Id"
      id="id"
      bind:value={$form.stream_id}
      type="number"
      {...$constraints.stream_id}
      error={$errors.stream_id?.join(',')}
    />
    <Input label="Name" id="name" bind:value={$form.name} error={$errors.name?.join(',')} />

    <div class="flex justify-end gap-3 mt-auto">
      <Button type="button" variant="text" class="w-2/5" on:click={closeModal}>Cancel</Button>
      <Button type="submit" variant="contained" disabled={$submitting} class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
