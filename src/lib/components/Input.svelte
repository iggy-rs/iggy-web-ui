<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

  interface $$Props extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    tag?: 'input' | 'textarea';
    label: string;
    name: string;
  }

  const { tag = 'input', label, name, class: className } = $$restProps as $$Props;
</script>

<div class="flex flex-col gap-1">
  <label for={name} class="text-sm">
    {label}
  </label>

  <svelte:element
    this={tag}
    {...$$restProps}
    id={name}
    {name}
    class={twMerge('rounded-md border border-gray-300 px-3 py-2 w-full', className)}
  />
</div>
