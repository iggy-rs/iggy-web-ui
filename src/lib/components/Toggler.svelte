<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let checked = false;
  export let value = '1';
</script>

<label
  class={twMerge(
    'h-[28px] w-[52px] block rounded-full  relative transition-colors ease-in-out duration-200 hover:cursor-pointer',
    checked ? ' bg-green300' : 'bg-shadeL400'
  )}
>
  <input type="checkbox" class="invisible" bind:checked />

  <div
    class={twMerge(
      'absolute left-[1px] top-1/2 -translate-y-1/2 w-[26px] h-[26px] bg-white rounded-full border border-shadeL700 transition-transform ease-in-out duration-200',
      checked && 'translate-x-[24px]'
    )}
  />
</label>
