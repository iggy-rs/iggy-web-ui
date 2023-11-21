<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';

  import Input from '../Input.svelte';
  import { z } from 'zod';
  import ModalBase from './ModalBase.svelte';
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import Button from '../Button.svelte';
  import DeleteButtonWithConfirmation from '../DeleteButtonWithConfirmation.svelte';

  export let closeModal: CloseModalFn;

  const schema = z.object({
    partitionsCount: z.coerce.number().min(1).default(1)
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
  <div class="h-[300px] flex flex-col bg-shadeL">
    <form method="POST" class="flex flex-col h-[300px] gap-4" use:enhance>
      <Input
        label="Partitions count"
        name="partitionsCount"
        bind:value={$form.partitionsCount}
        type="number"
        {...$constraints.partitionsCount}
        errorMessage={$errors.partitionsCount?.join(',')}
      />

      <div class="flex justify-end gap-3 mt-auto">
        <Button type="button" variant="text" class="w-2/5" on:click={() => closeModal()}
          >Cancel</Button
        >
        <Button type="button" variant="containedRed" class="w-2/5" on:click={() => {}}
          >Delete</Button
        >
      </div>
    </form>
  </div>
</ModalBase>
