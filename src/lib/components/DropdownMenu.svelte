<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import type { iconType } from './Icon.svelte';
  import Icon from './Icon.svelte';
  import { tooltip } from '$lib/actions/tooltip';
  import type { Placement } from '@floating-ui/dom';

  export let className = '';
  export let placement: Placement;
  export let itemGroups: {
    label: string;
    icon: iconType;
    action?: (close: VoidFunction) => void;
    className?: string;
  }[][];

  let tooltipRef: HTMLDivElement;
</script>

<div class={className} use:tooltip={{ placement, clickable: true }}>
  <button data-trigger>
    <slot />
  </button>

  <div class="tooltip" bind:this={tooltipRef}>
    <div class=" z-50 w-fit min-w-[128px]">
      {#each itemGroups as group}
        <div class="px-1 py-1">
          {#each group as { action, icon, className, label }}
            <button
              on:click={() => {
                if (action) {
                  action(() => tooltipRef.dispatchEvent(new Event('closeTooltip')));
                }
              }}
              class={twMerge(
                ' grid grid-cols-[20px,1fr] gap-x-1 rounded-md items-center w-full px-2 py-2 text-sm text-color cursor-default',
                action && 'hoverable cursor-pointer'
              )}
            >
              <span>
                <Icon name={icon} className="w-[17px] h-[17px]" />
              </span>
              <span class={twMerge('text-left', className)}>
                {label}
              </span>
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
