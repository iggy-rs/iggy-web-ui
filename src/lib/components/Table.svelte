<script lang="ts" context="module">
  type TableItem = {
    id: string | number;
  } & Record<string, { value: string | number; component: ComponentType; props: unknown }>;
  type Ordering<T> = { key: keyof T; asc: boolean } | { key: undefined; asc: undefined };

  function orderData<T>(data: T[], key: keyof T, asc: boolean) {
    return data.sort((a, b) => {
      if (a[key] > b[key]) return asc ? 1 : -1;
      else if (a[key] < b[key]) return asc ? -1 : 1;
      return 0;
    });
  }
</script>

<script lang="ts" generics="T extends TableItem">
  import DropdownMenu from './DropdownMenu.svelte';
  import type { ComponentProps, ComponentType } from 'svelte';
  import Icon, { type iconType } from './Icon.svelte';
  import Button from './Button.svelte';
  import { twMerge } from 'tailwind-merge';
  import Checkbox from './Checkbox.svelte';

  export let data: T[];
  export let colNames: Record<keyof T, string>;
  export let noDataMessage: string;
  export let actions: ComponentProps<InstanceType<typeof DropdownMenu>>['itemGroups'] | undefined =
    undefined;
  export let rowHref: ((item: T) => string) | undefined = undefined;
  export let onCheckedChange: ((checked: Record<string | number, boolean>) => void) | undefined =
    undefined;

  $: areRowsSelectable = onCheckedChange !== undefined;

  $: colDefs = Object.entries(colNames).map(([key, value]) => ({
    colName: value,
    fieldName: key
  })) as { colName: string; fieldName: keyof T }[];

  let ordering: Ordering<T> = {
    key: undefined,
    asc: undefined
  };

  $: orderedData = ordering.key ? orderData(data, ordering.key, ordering.asc!) : data;

  const handleRowClick = (item: T) => {
    if (areRowsSelectable && !rowHref) {
      const itemId = `${item.id}`;

      if (checkedItems.includes(itemId)) {
        checkedItems = checkedItems.filter((id) => id !== itemId);
      } else {
        checkedItems = [...checkedItems, itemId];
      }
    }
  };

  let checkedItems: string[] = [];

  const toggleAll = (e: Event) => {
    const { checked } = e.target as HTMLInputElement;
    checkedItems = checked ? data.map((item) => `${item.id}`) : [];
  };
</script>

{#if orderedData.length === 0}
  <div class="flex items-center justify-center text-gray-400 mt-7">
    <em>{noDataMessage}</em>
  </div>
{:else}
  <table class="px-5 w-full dark:text-white">
    <thead class="dark:text-shadeD100">
      <tr class="border-b">
        {#if areRowsSelectable}
          <!-- <TableHeader className="flex items-center justify-center w-[100px] ">
            <Checkbox
              on:change={toggleAll}
              checked={checkedItems.length === data.length}
              value="all"
              name="checkAll"
            />
          </TableHeader> -->
        {/if}

        {#each colDefs as { colName, fieldName } (fieldName)}
          <!-- <TableHeader
            on:click={() =>
              (ordering = {
                key: fieldName,
                asc: ordering.key !== fieldName ? true : !ordering.asc
              })}
            hasIcon={ordering.key === fieldName}
            iconName={ordering.asc ? 'arrowUp' : 'arrowDown'}
          >
            <span>{colName}</span>
          </TableHeader> -->
        {/each}

        <!-- <TableHeader className="w-[100px] min-[2000px]:w-[300px]">Actions</TableHeader> -->
      </tr>
    </thead>
    <tbody>
      {#each orderedData as item (item.id)}
        <tr
          class="border-b transition-all hoverable relative"
          on:click={() => handleRowClick(item)}
        >
          {#if areRowsSelectable}
            <td class="w-[100px]">
              <div class="flex items-center justify-center">
                <Checkbox
                  name={`${item.id}`}
                  value={item.id.toString()}
                  bind:bindGroup={checkedItems}
                />
              </div>
            </td>
          {/if}
          {#each colDefs as { fieldName }, idx (fieldName)}
            <!-- <TableCell item={item[fieldName]}>
              {item[fieldName]}
              {#if rowHref && idx === 0}
                <a
                  href={rowHref(item)}
                  class="absolute top-0 right-0 bottom-0 left-0 bg-orange-400"
                />
              {/if}
            </TableCell> -->
          {/each}
          <td class="px-5 pr-10 py-3 flex justify-end debug">
            {#if rowHref}
              <Icon class="w-[20px]" name="arrowRight" />
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
