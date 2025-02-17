<script>
  import logo from '$lib/assets/logo.png';
  /** @type {{children?: import('svelte').Snippet}} */
  let { children } = $props();
</script>

<div class="min-h-screen bg-shadeL100 dark:bg-shadeD700 flex flex-col items-center pt-[10vh]">
  <img src={logo} class="h-[100px] mb-10" alt="iggy" />
  {@render children?.()}
</div>
