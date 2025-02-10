<script lang="ts">
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  const progress = tweened(0);
  const opacity = tweened(0);

  let timer: ReturnType<typeof setInterval>;

  async function start() {
    clearInterval(timer);
    progress.set(0, { duration: 0 });
    opacity.set(1, { duration: 0 });

    await progress.set(16, { duration: 250, easing: cubicInOut });

    if (browser && $navigating) {
      timer = setInterval(() => {
        progress.update((v) => (v < 90 ? v + Math.floor(Math.random() * (10 - 4 + 1) + 4) : v), {
          duration: 300,
          easing: cubicInOut
        });
      }, 550);
    }
  }

  function stop() {
    progress.set(100, { duration: 100, easing: cubicInOut });
    opacity.set(0, { duration: 200, delay: 300 });
  }

  $: if (browser) {
    $navigating ? start() : stop();
  }
</script>

<div class="fixed left-0 right-0 top-0 pointer-events-none z-[999]">
  <div class="bg-green500 h-[2px]" style="width: {$progress}%; opacity:{$opacity};" />
</div>
