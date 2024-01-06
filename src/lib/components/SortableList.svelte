<script lang="ts" context="module">
  type ListItem = {
    id: string | number;
  };
  type Ordering<T> = { key: keyof T; asc: boolean } | { key: undefined; asc: undefined };

  function orderData<T>(data: T[], key: keyof T, asc: boolean) {
    return data.sort((a, b) => {
      if (a[key] > b[key]) return asc ? 1 : -1;
      else if (a[key] < b[key]) return asc ? -1 : 1;
      return 0;
    });
  }
</script>

<script lang="ts" generics="T extends ListItem">
  import { asConst } from '$lib/utils/asConst';

  import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';

  import { slide } from 'svelte/transition';

  import type { ComponentProps, ComponentType } from 'svelte';
  import Icon from './Icon.svelte';
  import Button from './Button.svelte';
  import Checkbox from './Checkbox.svelte';

  import { twMerge } from 'tailwind-merge';
  import { createEventDispatcher, onMount } from 'svelte';
  import { noTypeCheck } from '$lib/utils/noTypeCheck';
  import StopPropagation from './StopPropagation.svelte';

  export let data: T[];
  export let emptyDataMessage: string;
  export let colNames: Record<keyof T, string | undefined>;
  export let rowClass: string;

  let animationEnabled = true;
  let isAnimating = false;
  let timeout: number;

  onNavigate(() => {
    animationEnabled = false;

    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        animationEnabled = true;
      }, 800);
    };
  });

  export let hrefBuilder: ((item: T) => string) | undefined = undefined;

  let ordering: Ordering<T> = {
    key: undefined,
    asc: undefined
  };

  // $: columns =   Object.entries(colNames).map(([key, value]) => ({
  //   columnDisplayedName: value,
  //   columnName: key
  // })) as { columnDisplayedName: string; columnName: keyof T }[];

  $: columns = Object.keys(colNames)
    .filter((k) => colNames[k as string])
    .map((key) => ({
      columnDisplayedName: colNames[key as keyof T],
      columnName: key
    })) as { columnDisplayedName: string; columnName: keyof T }[];

  $: orderedData = ordering.key ? orderData(data, ordering.key, ordering.asc!) : data;

  let isBodyOverflowing = false;
  let bodyElem: HTMLDivElement | null = null;
  $: if (bodyElem && bodyElem.scrollHeight > bodyElem.offsetHeight) {
    isBodyOverflowing = true;
  }
</script>

<div class="overflow-auto flex-1">
  <!-- header -->
  <div
    class={twMerge(
      'flex h-[60px] min-h-[60px] bg-shadeL300 dark:bg-shadeD400 min-w-[1300px]',
      isBodyOverflowing && 'pr-5'
    )}
  >
    <div class="w-full {rowClass}">
      {#each columns as { columnName, columnDisplayedName } (columnName)}
        <button
          on:click={() =>
            (ordering = {
              key: columnName,
              asc: ordering.key !== columnName ? true : !ordering.asc
            })}
          class="flex items-center px-5 hover:cursor-pointer hover:bg-shadeL400 dark:hover:bg-shadeD200 dark:text-white justify-between outline-none focus:outline-none focus-visible:ring ring-inset ring-blue-600/60 transition-colors"
        >
          <span>
            {columnDisplayedName}
          </span>

          <div class="flex flex-col">
            {#each asConst(['caretUp', 'caretDown']) as icon}
              <Icon
                name={icon}
                class={twMerge(
                  'fill-shadeL800 stroke-shadeL800 dark:fill-shadeL900 dark:stroke-shadeL900 w-[18px] h-fit -mb-[4px] -my-[2px]',
                  ordering.key === columnName &&
                    ordering.asc &&
                    icon === 'caretUp' &&
                    ' stroke-black  fill-black dark:stroke-white dark:fill-white',
                  ordering.key === columnName &&
                    !ordering.asc &&
                    icon === 'caretDown' &&
                    ' stroke-black fill-black dark:stroke-white dark:fill-white'
                )}
              />
            {/each}
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- body -->
  <div class="min-w-[1300px] h-[calc(100%-60px)] pb-3 overflow-auto" bind:this={bodyElem}>
    {#if data.length === 0 && !isAnimating}
      <div class="flex items-center justify-center text-gray-400 mt-14 text-lg">
        <em>{emptyDataMessage}</em>
      </div>
    {/if}

    {#each orderedData as item (item.id)}
      <svelte:element
        this={hrefBuilder ? 'a' : 'div'}
        href={hrefBuilder && hrefBuilder(item)}
        on:introstart={noTypeCheck((e) => {
          if (!animationEnabled) return;
          e.target.style.backgroundColor = 'rgb(74, 222, 128)';
          isAnimating = true;
        })}
        on:introend={(e) => {
          setTimeout(() => {
            if (!animationEnabled) return;
            e.target.style = '';
          }, 800);
        }}
        on:outrostart={(e) => {
          if (!animationEnabled) return;
          e.target.style.backgroundColor = 'rgb(239 68 68)';
          isAnimating = true;
        }}
        on:outroend={(e) => {
          isAnimating = false;
        }}
        in:slide={{ duration: animationEnabled ? 300 : 0 }}
        out:slide={{ duration: animationEnabled ? 300 : 0, delay: animationEnabled ? 800 : 0 }}
        class={twMerge(
          'flex flex-row h-[65px] border-b hover:cursor-pointer hoverable dark:text-white'
        )}
      >
        <div class="flex items-center w-full {rowClass}">
          <slot {item}>
            {#each columns as { columnName }, idx (idx)}
              <div class={twMerge('px-5')}>
                <span class={columnName === 'id' ? 'font-semibold' : ''}>
                  {item[columnName]}
                </span>
              </div>
            {/each}
          </slot>
        </div>
      </svelte:element>
    {/each}
  </div>
</div>
