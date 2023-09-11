<script lang="ts">
  import type { TopicDetails } from '$lib/domain/TopicDetails';
  import type { CloseModalFn } from '$lib/types/utilTypes';
  import Button from '../Button.svelte';
  import Icon from '../Icon.svelte';
  import ModalBase from './ModalBase.svelte';

  export let topic: TopicDetails;
  export let closeModal: CloseModalFn;
</script>

<ModalBase {closeModal} title="Topic settings">
  <div class="h-[300px] flex flex-col">
    <!-- <div class="flex justify-end gap-3 mt-auto">
        <Button variant="text" class="w-2/5" on:click={closeModal}>Cancel</Button>
        <Button type="submit" variant="contained" class="w-2/5">Save</Button>
      </div> -->
    <Button variant="containedRed" class="w-[120px] mx-auto mt-auto">
      <Icon name="trash" />
      Delete</Button
    >
  </div>
</ModalBase>
