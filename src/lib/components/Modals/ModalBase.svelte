<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';
  import Icon from '../Icon.svelte';
  import type { TransitionConfig } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import Button from '../Button.svelte';

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

  interface $$Props extends HTMLAttributes<HTMLDivElement> {
    closeModal: () => void;
    title?: string;
  }

  const { class: className, closeModal, title, ...rest } = $$restProps as $$Props;
</script>

<div
  {...rest}
  transition:modalTransition
  class={twMerge(
    'fixed left-1/2 top-1/2 shadow-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-shadeD700 z-[600]  max-h-[90vh] overflow-auto min-w-[min(90vw,400px)] p-7 pb-5 flex flex-col',
    className
  )}
>
  <div class="h-[15%]">
    <Button
      variant="rounded"
      on:click={closeModal}
      class="transition-colors   absolute top-5 right-5 p-2"
    >
      <Icon name="close" strokeWidth={2.3} />
    </Button>

    {#if title}
      <h2 class="text-xl text-color font-semibold mb-7">{title}</h2>
    {/if}
  </div>

  <slot />
</div>
