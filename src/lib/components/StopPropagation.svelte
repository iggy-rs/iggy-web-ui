<script lang="ts">
  let className: string | undefined = undefined;
  export { className as class };
</script>

<div
  class={className}
  on:click={(e) => {
    e.stopPropagation();
  }}
>
  <slot />
</div>
