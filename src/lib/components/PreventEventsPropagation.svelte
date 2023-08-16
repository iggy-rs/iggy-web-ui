<script lang="ts">
  const stop = (e: Event) => {
    e.stopPropagation();
  };
</script>

<div on:click={stop} aria-hidden="true">
  <slot />
</div>
