<script lang="ts" context="module">
  import type { ComponentProps } from 'svelte';
  import { fade } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import AddStreamModal from './AddStreamModal.svelte';
  import AddTopicModal from './AddTopicModal.svelte';
  import StreamSettingsModal from './StreamSettingsModal.svelte';

  const modals = {
    addTopicModal: AddTopicModal,
    addStreamModal: AddStreamModal,
    streamSettingsModal: StreamSettingsModal
  };

  type ModalProps<T extends keyof typeof modals> = Omit<
    ComponentProps<InstanceType<(typeof modals)[T]>>,
    'closeModal'
  >;

  const openedModal = writable<{ modal: keyof typeof modals; props: any } | undefined>();

  export function openModal<T extends keyof typeof modals>(modal: T, props?: ModalProps<T>) {
    openedModal.set({ modal, props });
  }

  function closeModal() {
    openedModal.set(undefined);
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeModal()} />

{#if $openedModal}
  <div transition:fade={{ duration: 100 }} class="fixed inset-0 bg-black/40 z-[500]" />
  <svelte:component this={modals[$openedModal.modal]} {...$openedModal.props} {closeModal} />
{/if}
