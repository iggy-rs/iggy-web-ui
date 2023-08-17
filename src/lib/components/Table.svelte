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
  import { twMerge } from 'tailwind-merge';
  import Icon from './Icon.svelte';
  export let data: T[];
  export let colNames: Record<keyof T, string>;
  export let onRowClick: ((item: T) => void) | undefined = undefined;

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

<table class="w-full px-10">
  <thead class="px-7">
    <tr class="border-b">
      {#each colDefs as { colName, fieldName } (fieldName)}
        <th
          on:click={() =>
            (ordering = { key: fieldName, asc: ordering.key !== fieldName ? true : !ordering.asc })}
          class=" hover:bg-neutral-200 cursor-pointer transition-all rounded-t-md py-5 text-sm text-gray-500 px-5 whitespace-nowrap font-semibold"
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
      <tr
        class="border-b transition-all hover:bg-gray-200 cursor-pointer"
        on:click={() => onRowClick && onRowClick(item)}
      >
        {#each colDefs as { fieldName } (fieldName)}
          <td class="px-5 py-3">
            {item[fieldName]}
          </td>
        {/each}
        <td class="px-5 pr-10 py-3 flex justify-end">
          {#if onRowClick}
            <Icon className="w-[20px]" name="arrowRight" />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
