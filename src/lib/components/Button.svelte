<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  const baseClass =
    'flex items-center justify-center text-sm font-semibold transition-all gap-2 rounded-[4px] px-5 py-2';

  const variants = {
    rounded:
      'w-[40px] h-[40px] rounded-full dark:text-white flex items-center justify-center dark:hover:bg-shadeD300 hover:bg-shadeL400',
    outlined: twMerge(
      baseClass,
      'border-black dark:border-white dark:text-white border-2 bg-transparent dark:hover:bg-shadeD400 hover:bg-shadeL400'
    ),
    contained: twMerge(
      baseClass,
      'bg-black text-white dark:bg-white dark:text-black dark:text-black hover:shadow-lg'
    ),
    text: twMerge(
      baseClass,
      'bg-transparent text-color dark:hover:bg-shadeD500 hover:bg-shadeL400'
    ),
    delete: twMerge(
      baseClass,
      'border-2 border-red-300 text-red-300 hover:text-red-400 hover:border-red-400'
    )
  };

  interface $$Props extends HTMLButtonAttributes {
    variant: keyof typeof variants;
  }

  const { class: className, variant, ...rest } = $$restProps as $$Props;
</script>

<button on:click class={twMerge(variants[variant], className)} {...rest}>
  <slot />
</button>
