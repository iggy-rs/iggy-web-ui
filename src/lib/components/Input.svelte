<script lang="ts">
  export let tag: 'input' | 'textarea' = 'input';
</script>

<div>
  <svelte:element this={tag} class="rounded-md border border-gray-300 px-3 py-2 w-full" />
</div>
