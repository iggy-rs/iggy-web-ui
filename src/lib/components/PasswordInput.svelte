<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Input from '$lib/components/Input.svelte';
  import Icon from './Icon.svelte';
  import Button from './Button.svelte';

  interface $$Props extends HTMLInputAttributes {
    label: string;
    id?: string;
    name: string;
    errorMessage?: string;
    value: string | number;
  }

  export let label: string;
  export let id: string | undefined = undefined;
  export let name: string;
  export let errorMessage: string | undefined = undefined;
  export let value: string | number;

  let isVisible = false;
</script>

<Input
  {label}
  {name}
  {id}
  type={isVisible ? 'text' : 'password'}
  bind:value
  {errorMessage}
  {...$$restProps}
>
  <span slot="suffix">
    <Button
      variant="rounded"
      class="w-[33px] h-[33px] p-0 flex items-center justify-center"
      on:click={(e) => {
        isVisible = !isVisible;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Icon
        name={isVisible ? 'eye' : 'eyeOff'}
        class="w-[20px] h-[20px] dark:stroke-white stroke-shadeD200"
      />
    </Button>
  </span>
</Input>
