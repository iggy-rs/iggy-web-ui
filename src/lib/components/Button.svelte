<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  const baseClass =
    'flex items-center justify-center text-sm font-semibold transition-all gap-2 rounded-[4px] px-5 py-2';

  const variants = {
    rounded:
      'w-[40px] h-[40px] rounded-full  transition-all  flex items-center justify-center hover:bg-gray-200 ',
    outlined: twMerge(baseClass, 'border-black border-2 bg-transparent hover:bg-gray-200'),
    contained: twMerge(baseClass, 'bg-black text-white hover:shadow-lg'),
    text: twMerge(baseClass, 'bg-transparent hover:bg-gray-200')
  };

  interface $$Props extends HTMLButtonAttributes {
    variant: keyof typeof variants;
  }

  const { class: className, variant, ...rest } = $$restProps as $$Props;
</script>

<button on:click class={twMerge(variants[variant], className)} {...rest}>
  <slot />
</button>
