<script lang="ts">
  export let close: () => void;
  export let test: string;
</script>

<div class="bg-white">
  <h2>Add stream</h2>

  <button on:click={close}>close</button>
</div>
