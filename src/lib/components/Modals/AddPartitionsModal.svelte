<script lang="ts">
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import { z } from 'zod';
  import Input from '../Input.svelte';
  import ModalBase from './ModalBase.svelte';
  import { numberSizes } from '$lib/utils/numberSizes';
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { fetchRouteApi } from '$lib/api/fetchRouteApi';
  import { page } from '$app/stores';
  import { dataHas } from '$lib/utils/dataHas';
  import { invalidateAll } from '$app/navigation';
  import { showToast } from '../AppToasts.svelte';
  import Button from '../Button.svelte';

  export let closeModal: CloseModalFn;

  const schema = z.object({
    partitions_count: z.number().min(1).max(numberSizes.max.u32).default(1)
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,
    invalidateAll: false,
    taintedMessage: false,
    async onUpdate({ form }) {
      if (!form.valid) return;

      const { data, ok } = await fetchRouteApi({
        method: 'POST',
        path: `/streams/${+$page.params.streamId}/topics/${+$page.params.topicId}/partitions`,
        body: {
          partitions_count: $form.partitions_count
        }
      });

      if (dataHas(data, 'field', 'reason')) {
        return setError(form, data.field, data.reason);
      }

      if (ok) {
        closeModal(async () => {
          await invalidateAll();
          showToast({
            type: 'success',
            description:
              $form.partitions_count > 1
                ? `${$form.partitions_count} partitions have been added.`
                : '1 partition has been added.',
            duration: 3500
          });
        });
      }
    }
  });
</script>

<ModalBase {closeModal} title="Add partitions">
  <form method="POST" class="flex flex-col gap-4 h-[300px]" use:enhance>
    <Input
      label="Partitions count"
      type="number"
      name="partitionsCount"
      bind:value={$form.partitions_count}
      {...$constraints.partitions_count}
      errorMessage={$errors.partitions_count?.join(',')}
    />

    <div class="flex justify-end gap-3 mt-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={() => closeModal()}
        >Cancel</Button
      >
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
