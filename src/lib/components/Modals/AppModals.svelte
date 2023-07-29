<script lang="ts" context="module">
  import type { ComponentProps } from 'svelte';
  import { fade, type TransitionConfig } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { writable } from 'svelte/store';
  import Icon from '$lib/components/Icon.svelte';
  import AddStreamModal from './AddStreamModal.svelte';
  import AddTopicModal from './AddTopicModal.svelte';

  const modals = {
    addTopicModal: AddTopicModal,
    addStreamModal: AddStreamModal
  };

  type ModalProps<T extends keyof typeof modals> = Omit<
    ComponentProps<InstanceType<(typeof modals)[T]>>,
    'closeModal'
  >;

  const openedModal = writable<{ modal: keyof typeof modals; props: any } | undefined>();

  export function openModal<T extends keyof typeof modals>(modal: T, props: ModalProps<T>) {
    openedModal.set({ modal, props });
  }

  function closeModal() {
    openedModal.set(undefined);
  }

  function modalTransition(node: Element): TransitionConfig {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    const scaleStart = 0.94;

    //t= 0..1 on enter and 1..0 on unmount
    //u = 1..0 on enter and 0..1 on unmount

    const ss = 1 - scaleStart;

    return {
      duration: 250,
      easing: quintOut,
      css: (t, u) => `transform: ${transform} scale(${1 - u * ss});
                          opacity: ${t}`
    };
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && closeModal()} />

{#if $openedModal}
  <div transition:fade={{ duration: 150 }} class="fixed inset-0 bg-gray-800/40 z-[500]" />

  <div
    transition:modalTransition
    class="fixed left-1/2 top-1/2 shadow-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white z-[600] min-h-[50vh] w-[400px] p-10 flex flex-col"
  >
    <button
      on:click={closeModal}
      class="bg-gray-200 w-[45px] h-[45px] rounded-full flex items-center justify-center transition-colors hover:bg-gray-300 absolute top-5 right-5"
    >
      <Icon name="close" strokeWidth={2.3} />
    </button>

    <svelte:component this={modals[$openedModal.modal]} {...$openedModal.props} {closeModal} />
  </div>
{/if}
