<script lang="ts">
  export let foo: string;
  export let test: string;
</script>

<!-- let animationState: 'introStarted' | 'introEnded' | 'outroStarted' | 'outroEnded' | 'none' =
    'none';

  function fade(node: HTMLElement, { delay = 0, duration = 400 } = {}) {
    const o = +getComputedStyle(node).opacity;

    return {
      delay,
      duration,
      css: (t: number) => `background:red;`
    };
  }
</script>

<div class="w-[300px] h-[300px] debug" in:fade>
  {animationState}
</div> -->
