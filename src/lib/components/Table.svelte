<script lang="ts" context="module">
  type GenericExtends = { id: string | number };
  type Ordering<T> = { key: keyof T; asc: boolean } | { key: undefined; asc: undefined };

  function orderData<T>(data: T[], key: keyof T, asc: boolean) {
    return data.sort((a, b) => {
      if (a[key] > b[key]) return asc ? 1 : -1;
      else if (a[key] < b[key]) return asc ? -1 : 1;
      return 0;
    });
  }
</script>

<script lang="ts" generics="T extends GenericExtends">
  import DropdownMenu from './DropdownMenu.svelte';

  import type { ComponentProps } from 'svelte';

  import Icon, { type iconType } from './Icon.svelte';

  import Button from './Button.svelte';

  import { twMerge } from 'tailwind-merge';

  export let data: T[];
  export let colNames: Record<keyof T, string>;
  export let noDataMessage: string;
  export let actions: ComponentProps<InstanceType<typeof DropdownMenu>>['itemGroups'] | undefined =
    undefined;
  export let rowHref: ((item: T) => string) | undefined = undefined;

  $: colDefs = Object.entries(colNames).map(([key, value]) => ({
    colName: value,
    fieldName: key
  })) as { colName: string; fieldName: keyof T }[];

  let ordering: Ordering<T> = {
    key: undefined,
    asc: undefined
  };

  $: orderedData = ordering.key ? orderData(data, ordering.key, ordering.asc!) : data;
</script>

{#if orderedData.length === 0}
  <div class="flex items-center justify-center text-gray-400 mt-7">
    <em>{noDataMessage}</em>
  </div>
{:else}
  <table class="px-5 w-full dark:text-white">
    <thead class="dark:text-shadeD100">
      <tr class="border-b px-5">
        <th class="w-2" />
        {#each colDefs as { colName, fieldName } (fieldName)}
          <th
            on:click={() =>
              (ordering = {
                key: fieldName,
                asc: ordering.key !== fieldName ? true : !ordering.asc
              })}
            class=" hoverable cursor-pointer transition-all rounded-t-md py-5 text-sm px-5 whitespace-nowrap font-semibold"
          >
            <div class="flex items-center justify-between w-full">
              <span>
                {colName}
              </span>

              <Icon
                className={twMerge(
                  ordering.key === fieldName ? 'visible' : 'invisible',
                  'w-[19px] h-[19px]'
                )}
                name={ordering.asc ? 'arrowUp' : 'arrowDown'}
              />
            </div>
          </th>
        {/each}
        <th class="w-[100px] min-[2000px]:w-[300px]" />
      </tr>
    </thead>
    <tbody>
      {#each orderedData as item (item.id)}
        <tr class="border-b transition-all hoverable cursor-pointer relative">
          <td class="w-2">
            {#if rowHref}
              <a href={rowHref(item)} class="absolute top-0 right-0 bottom-0 left-0" />
            {/if}
          </td>
          {#each colDefs as { fieldName } (fieldName)}
            <td class="px-5 py-3">
              {item[fieldName]}
            </td>
          {/each}
          <td class="px-5 pr-10 py-3 flex justify-end">
            {#if rowHref}
              <Icon className="w-[20px]" name="arrowRight" />
            {/if}

            {#if actions}
              <DropdownMenu itemGroups={actions} placement="left-start">
                <Button variant="rounded" class="p-5">
                  <Icon name="verticalDots" />
                </Button>
              </DropdownMenu>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
