<script lang="ts">
  import { noTypeCheck } from '$lib/utils/noTypeCheck';
  import Icon from './Icon.svelte';
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { createCombobox } from 'svelte-headlessui';
  import Transition from 'svelte-transition';
  import Button from './Button.svelte';
  import { twMerge } from 'tailwind-merge';
  import Loader from './Loader.svelte';

  type T = $$Generic<{ id: number; name: string }>;

  export let label: string | undefined = undefined;
  export let items: T[];
  export let isLoading: boolean = false;
  export let selectedValue: T | undefined = undefined;
  export let formatter: ((item: T) => string) | undefined = undefined;

  const combobox = createCombobox({ label: label || 'Actions' });
  const dispatch = createEventDispatcher<{ select: T }>();

  let mounted = false;
  onMount(() => (mounted = true));

  $: if (items.length > 0 && selectedValue === undefined) {
    selectedValue = items[0];
  }

  $: (async () => {
    if (selectedValue !== undefined) {
      combobox.set({
        selected: formatter ? { ...selectedValue, name: formatter(selectedValue) } : selectedValue
      });

      if (!mounted) await tick();
      dispatch('select', selectedValue);
    }
  })();

  $: filtered = (() => {
    const value = $combobox.filter.toLowerCase().replace(/\s+/g, '');
    return items.filter((item) => {
      if (formatter) {
        return formatter(item).toLowerCase().replace(/\s+/g, '').includes(value);
      }
      const rawName = item.name.toLowerCase().replace(/\s+/g, '');
      return rawName.includes(value);
    });
  })();
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <label class="text-sm ml-1 text-color">
      {label}
    </label>
  {/if}

  <div class="relative">
    <div
      class="rounded-md dark:bg-shadeD400 ring-1 text-color ring-gray-300 dark:ring-gray-500 flex items-center h-[40px] text-color relative focus-within:ring-2 focus-within:ring-gray-400 transition group"
    >
      <input
        use:combobox.input
        on:select={(e) => {
          selectedValue = noTypeCheck(e).detail.selected;
        }}
        disabled={isLoading}
        class="w-full bg-transparent px-4 outline-none"
      />

      {#if isLoading}
        <div class="mr-4">
          <Loader />
        </div>
      {:else}
        <div use:combobox.button>
          <Button
            tabindex={-1}
            variant="rounded"
            disabled={isLoading}
            type="button"
            class={$combobox.expanded ? 'rotate-180' : 'rotate-0'}
          >
            <Icon name="chevronDown" class="w-[18px]" />
          </Button>
        </div>
      {/if}
    </div>

    <Transition
      show={$combobox.expanded}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      on:after-leave={() => combobox.reset()}
    >
      <ul
        use:combobox.items
        class="absolute mt-1 z-10 max-h-[200px] w-full overflow-auto rounded-md dark:bg-shadeD400 bg-shadeL200 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {#each filtered as value (value.id)}
          {@const active = $combobox.active?.id === value.id}
          {@const selected = $combobox.selected?.id === value.id}
          <li
            class={twMerge(
              'relative text-color select-none py-2 px-4  hoverable',
              selected && 'dark:!bg-shadeD170 !bg-shadeL600',
              active && 'dark:bg-shadeD200 bg-shadeL300'
            )}
            use:combobox.item={{ value }}
          >
            <span class="block truncate">{formatter ? formatter(value) : value.name}</span>
          </li>
        {:else}
          <li class="relative cursor-default select-none px-4 py-2 text-color">
            <span class="block truncate font-normal">Nothing found</span>
          </li>
        {/each}
      </ul>
    </Transition>
  </div>
</div>
