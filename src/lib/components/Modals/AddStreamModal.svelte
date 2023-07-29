<script lang="ts">
  import Input from '../Input.svelte';

  export let closeModal: () => void;
</script>

<div class="bg-white debug h-full flex-1">
  <h2>Add stream</h2>

  <Input />

  <button on:click={closeModal}> close modal </button>
</div>
