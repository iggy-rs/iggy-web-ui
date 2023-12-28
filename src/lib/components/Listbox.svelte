<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { createListbox } from 'svelte-headlessui';
  import { fade, slide } from 'svelte/transition';
  import Icon from './Icon.svelte';
  import { twMerge } from 'tailwind-merge';

  type T = $$Generic<{ value: string; name: string }>;

  export let options: readonly T[];
  export let selectedValue: T['value'];
  export let selectedOptionPrefix = '';
  export let label: string | undefined = undefined;
  export let id: string | undefined = undefined;
  export let errorMessage: string | undefined = undefined;

  $: selectedOption = options.find((option) => option.value === selectedValue)!;
  const listbox = createListbox({ label: 'Actions', selected: selectedOption });
  $: listbox.set({ selected: selectedOption });

  const dispatch = createEventDispatcher<{ selectedValue: T['value'] }>();
  function onSelect(e: Event) {
    const selected = (e as CustomEvent).detail.selected.value;
    selectedValue = selected;
    dispatch('selectedValue', selected);
  }
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <label for={id} class="text-sm ml-1 text-color">
      {label}
    </label>
  {/if}

  <div class="relative w-full">
    <button
      use:listbox.button
      on:select={onSelect}
      class={twMerge(
        'rounded-md dark:bg-shadeD400 w-full px-4  ring-1 ring-gray-300 dark:ring-gray-500 flex items-center h-[40px] text-color focus-within:ring-2 focus-within:ring-gray-400 transition group relative',
        $listbox.expanded && 'ring-creator-gray4',
        errorMessage && '!ring-red-600 ring-2'
      )}
    >
      <span class="block truncate text-sm">{selectedOptionPrefix} {$listbox.selected.name}</span>
      <Icon
        name="chevronDown"
        class={twMerge(
          ' pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 fill-creator-black w-[14px] transition-transform',
          $listbox.expanded && '-rotate-180'
        )}
      />
    </button>

    {#if $listbox.expanded}
      <ul
        use:listbox.items
        transition:fade={{ duration: 100 }}
        class="absolute mt-1 max-h-60 py-1 z-20 w-full border overflow-auto dark:bg-shadeD400 bg-shadeL200 rounded-md text-sm shadow-lg text-color"
      >
        {#each options as option, idx (idx)}
          {@const selected = $listbox.selected === option}
          <li
            class={twMerge(
              'relative cursor-default select-none py-2 pr-4 transition-colors p-[10px]  hoverable',
              selected && 'dark:!bg-shadeD170 !bg-shadeL600'
            )}
            use:listbox.item={{ value: option }}
          >
            <span class="block truncate {selected ? 'font-medium' : 'font-normal'}"
              >{option.name}</span
            >
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if errorMessage}
    <span class="text-red-600 text-xs font-medium ml-1">
      {errorMessage}
    </span>
  {/if}
</div>
