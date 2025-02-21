<script>
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<div class="min-h-screen bg-shadeL100 dark:bg-shadeD700 flex flex-col items-center pt-[10vh]">
  <img src="/logo.png" class="h-[100px] mb-10" alt="iggy" />
  {@render children?.()}
</div>
