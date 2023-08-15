<script lang="ts">
  import Icon from './Icon.svelte';

  type T = $$Generic<{ id: number }>;

  export let data: T[];
  export let colNames: Record<keyof T, string>;
  export let onRowClick: (dataId: number | string) => void;

  $: colDefs = Object.entries(colNames).map(([key, value]) => ({
    colName: value,
    fieldName: key
  })) as { colName: string; fieldName: keyof T }[];
</script>

<table class="w-full px-10">
  <thead class="px-7">
    <tr class="border-b">
      {#each colDefs as { colName, fieldName }, i (fieldName)}
        <td
          class="first:pl-10 py-5 text-sm text-gray-600 px-5 whitespace-nowrap font-semibold"
          style="width: {i === 0 ? '100px' : 'calc(100% / {colDefs.length})'}">{colName}</td
        >
      {/each}
      <td />
    </tr>
  </thead>
  <tbody>
    {#each data as data (data.id)}
      <tr
        class="border-b transition-all hover:bg-gray-200 cursor-pointer"
        on:click={() => onRowClick(data.id)}
      >
        {#each colDefs as { fieldName }, j (fieldName)}
          <td
            class="px-5 py-3 first:pl-10"
            style="width: {j === 0 ? '100px' : 'calc(100% / {colDefs.length})'}"
          >
            {data[fieldName]}
          </td>
        {/each}
        <td class="px-5 pr-10 py-3 w-[70px]">
          <Icon className="w-[20px]" name="slimArrowRight" />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
