<script lang="ts">
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Input from '../Input.svelte';
  import Button from '../Button.svelte';
  import ModalBase from './ModalBase.svelte';
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import type { StreamDetails } from '$lib/domain/StreamDetails';
  import { apiClient } from '$lib/utils/apiClient';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { showToast } from '../AppToasts.svelte';

  export let closeModal: CloseModalFn;
  export let streamDetails: StreamDetails;

  const clientQuery = useQueryClient();

  const schema = z.object({
    topic_id: z.coerce.number().min(1).max(255).default(0),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters')
      .default(''),
    partitionsCount: z.coerce.number().min(0).default(0),
    messageExpiry: z.coerce.number().min(0).optional()
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,

    async onUpdate({ form }) {
      if (!form.valid) return;

      const result = await apiClient.post({
        path: `/streams/${streamDetails.id}/topics`,
        body: {
          topic_id: +form.data.topic_id,
          name: form.data.name,
          partitions_count: +form.data.partitionsCount
        }
      });

      if (result.success) {
        await clientQuery.refetchQueries({
          queryKey: ['streamDetails', streamDetails.id]
        });
        closeModal();
        showToast({
          type: 'success',
          title: 'Success',
          description: 'Topic added successfully'
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

<ModalBase {closeModal} title="Add topic">
  <form method="POST" class="flex flex-col h-[450px] gap-4" use:enhance>
    <Input
      label="Id"
      id="id"
      type="number"
      bind:value={$form.topic_id}
      {...$constraints.topic_id}
      error={$errors.topic_id?.join(',')}
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

    <Input
      label="Message expiry"
      type="number"
      id="messageExpiry"
      bind:value={$form.messageExpiry}
      {...$constraints.messageExpiry}
      error={$errors.messageExpiry?.join(',')}
    />

    <div class="flex justify-end gap-3 mt-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={closeModal}>Cancel</Button>
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
