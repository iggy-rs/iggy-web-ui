<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { useQueryClient } from '@tanstack/svelte-query';
  import Input from '../Input.svelte';
  import { z } from 'zod';
  import ModalBase from './ModalBase.svelte';
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import Button from '../Button.svelte';
  import DeleteButtonWithConfirmation from '../DeleteButtonWithConfirmation.svelte';

  export let closeModal: CloseModalFn;

  const clientQuery = useQueryClient();

  const schema = z.object({
    partitions_count: z.coerce.number().min(1).default(1)
  });

  const { form, errors, enhance, constraints, submitting } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,

    async onUpdate({ form }) {
      if (!form.valid) return;

      // const result = await apiClient.post({
      //   path: `/streams/${streamDetails.id}/topics`,
      //   body: {
      //     topic_id: +form.data.topic_id,
      //     name: form.data.name,
      //     partitions_count: +form.data.partitionsCount
      //   }
      // });

      // if (result.success) {
      //   await clientQuery.refetchQueries({
      //     queryKey: ['streamDetails', streamDetails.id]
      //   });
      //   closeModal();
      //   showToast({
      //     type: 'success',
      //     title: 'Success',
      //     description: 'Topic added successfully'
      //   });
      //   return;
      // }

      // const { error } = result;
      // if ('field' in error && 'reason' in error) {
      //   setError(form, error.field as any, error.reason as any);
      // }
    }
  });
</script>

<ModalBase {closeModal} title="Delete partitions">
  <div class="h-[300px] flex flex-col">
    <form method="POST" class="flex flex-col h-[300px] gap-4" use:enhance>
      <Input
        label="Partitions count"
        id="partitions_count"
        bind:value={$form.partitions_count}
        type="number"
        {...$constraints.partitions_count}
        error={$errors.partitions_count?.join(',')}
      />

      <div class="flex justify-end gap-3 mt-auto">
        <Button type="button" variant="text" class="w-2/5" on:click={closeModal}>Cancel</Button>
        <DeleteButtonWithConfirmation />
      </div>
    </form>
  </div>
</ModalBase>
