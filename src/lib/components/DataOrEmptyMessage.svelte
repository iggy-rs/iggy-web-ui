<script lang="ts">
  export let data: unknown[];
  export let noDataMessage: string;
</script>

{#if data.length === 0}
  <div class="flex items-center justify-center text-gray-400 mt-7">
    <em>{noDataMessage}</em>
  </div>
{:else}
  <slot />
{/if}
