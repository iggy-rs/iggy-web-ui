<script lang="ts">
  export let name: string;
</script>

<div class="flex items-baseline text-gray-400">
  <span class=" text-2xl mr-1">Loading {name} </span>

  {#each [0, 150, 300] as delay}
    <span class="loader-animation text-2xl" style="animation-delay:{delay}ms">.</span>
  {/each}
</div>

<style lang="postcss">
  .loader-animation {
    animation: dots-animation 600ms infinite alternate;
  }

  @keyframes dots-animation {
    from {
      opacity: 0.1;
    }

    to {
      opacity: 1;
    }
  }
</style>
