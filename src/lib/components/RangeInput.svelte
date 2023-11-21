<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  const sizes = {
    small: '[&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:h-[13px] h-[4px]',
    medium: '[&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] h-[6px]',
    big: '[&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:h-[20px] h-[8px]'
  };

  export let min: number;
  export let max: number;
  export let initValue: number;
  export let className = '';
  export let size: keyof typeof sizes = 'medium';

  export let value = initValue;
</script>

<div class=" w-fit relative flex items-center justify-center">
  <input
    type="range"
    bind:value
    class={twMerge('progress', sizes[size], className)}
    style="background:linear-gradient(to right, {value > 70
      ? '#f0f01f'
      : 'var(--green500)'}  0%, {value}%, var(--shadeL500) {value}%, var(--shadeL500) 100%)"
  />
</div>

<style>
  .progress {
    position: relative;
    z-index: 10;
    border-radius: 8px;
    outline: none;
    transition: background 450ms ease-in;
    -webkit-appearance: none;
  }

  .progress::-webkit-slider-thumb {
    border-radius: 50%;
    -webkit-appearance: none;
    cursor: ew-resize;
    background: var(--shadeL500);
    border: 1px solid var(--shadeL800);
  }

  .dark .progress::-webkit-slider-thumb {
    background: white !important;
  }

  .progress::-webkit-slider-thumb:hover {
    cursor: ew-resize;
  }
</style>
