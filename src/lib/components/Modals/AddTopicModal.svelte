<script lang="ts">
  import { setError, superForm, superValidateSync } from 'sveltekit-superforms/client';
  import { z } from 'zod';
  import Input from '../Input.svelte';
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

  export let closeModal: CloseModalFn;
  export let streamDetails: StreamDetails;
  export let nextTopicId: number;

  const schema = z.object({
    topic_id: z.number().min(0).max(numberSizes.max.u32).default(nextTopicId),
    name: z
      .string()
      .min(1, 'Name must contain at least 1 character')
      .max(255, 'Name must not exceed 255 characters'),
    partitions_count: z.number().min(0).max(numberSizes.max.u32).default(1),
    message_expiry: z.number().min(0).max(numberSizes.max.u32)
  });

  const { form, errors, enhance, constraints } = superForm(superValidateSync(schema), {
    SPA: true,
    validators: schema,

    async onUpdate({ form }) {
      if (!form.valid) return;

      const { data, ok } = await fetchRouteApi({
        method: 'POST',
        path: `/streams/${streamDetails.id}/topics`,
        body: {
          topic_id: form.data.topic_id,
          name: form.data.name,
          partitions_count: form.data.partitions_count,
          message_expiry: form.data.message_expiry
        }
      });

      if (dataHas(data, 'field', 'reason')) {
        return setError(form, data.field, data.reason);
      }

      if (ok) {
        closeModal(async () => {
          await customInvalidateAll();
          showToast({
            type: 'success',
            description: `Topic ${$form.name} has been added.`,
            duration: 3500
          });
        });
      }
    }
  });
</script>

<ModalBase {closeModal} title="Add topic">
  <form method="POST" class="flex flex-col h-[450px] gap-4" use:enhance>
    <Input
      label="Id"
      name="topic_id"
      type="number"
      bind:value={$form.topic_id}
      {...$constraints.topic_id}
      errorMessage={$errors.topic_id?.join(',')}
    />
    <Input
      name="topicName"
      label="Name"
      bind:value={$form.name}
      errorMessage={$errors.name?.join(',')}
    />

    <Input
      label="Partitions count"
      type="number"
      name="partitionsCount"
      bind:value={$form.partitions_count}
      {...$constraints.partitions_count}
      errorMessage={$errors.partitions_count?.join(',')}
    />

    <Input
      label="Message expiry"
      type="number"
      name="messageExpiry"
      bind:value={$form.message_expiry}
      {...$constraints.message_expiry}
      errorMessage={$errors.message_expiry?.join(',')}
    />
    <span class="text-xs text-shadeD200 dark:text-shadeL700 -mt-1">
      {durationFormatter(+$form.message_expiry || 0)}
    </span>

    <div class="flex justify-end gap-3 mt-auto">
      <Button variant="text" type="button" class="w-2/5" on:click={() => closeModal()}
        >Cancel</Button
      >
      <Button type="submit" variant="contained" class="w-2/5">Create</Button>
    </div>
  </form>
</ModalBase>
