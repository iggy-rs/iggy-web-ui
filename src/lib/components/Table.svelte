<script lang="ts" context="module">
  type GenericExtends = { id: string | number };
</script>

<script lang="ts" generics="T extends GenericExtends">
  import PreventEventsPropagation from './PreventEventsPropagation.svelte';

  import Checkbox from './Checkbox.svelte';
  import Icon from './Icon.svelte';

  export let data: T[];
  export let colNames: Record<keyof T, string>;
  export let onRowClick: ((item: T) => void) | undefined = undefined;

  $: colDefs = Object.entries(colNames).map(([key, value]) => ({
    colName: value,
    fieldName: key
  })) as { colName: string; fieldName: keyof T }[];

  let selectedItems = Object.assign({}, ...data.map((data) => ({ [data.id]: false }))) as Record<
    string | number,
    boolean
  >;

  const toggleAll = (checked: boolean) =>
    Object.keys(selectedItems).forEach((key) => (selectedItems[key] = checked));
</script>

<table class="w-full px-10">
  <thead class="px-7">
    <tr class="border-b">
      <th class="w-[80px] pl-10">
        <PreventEventsPropagation>
          <Checkbox
            onChange={(e) => toggleAll(e.currentTarget.checked)}
            checked={Object.values(selectedItems).every((checked) => checked)}
          />
        </PreventEventsPropagation>
      </th>
      {#each colDefs as { colName, fieldName } (fieldName)}
        <th
          class=" hover:bg-neutral-200 cursor-pointer transition-all rounded-t-md py-5 text-sm text-gray-500 px-5 whitespace-nowrap font-semibold text-left"
          >{colName}</th
        >
      {/each}
      <th class="w-[100px] min-[2000px]:w-[300px]" />
    </tr>
  </thead>
  <tbody>
    {#each data as item (item.id)}
      <tr
        class="border-b transition-all hover:bg-gray-200 cursor-pointer"
        on:click={() => onRowClick && onRowClick(item)}
      >
        <td class="pl-10 px-5">
          <PreventEventsPropagation>
            <Checkbox bind:checked={selectedItems[item.id]} />
          </PreventEventsPropagation>
        </td>
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
