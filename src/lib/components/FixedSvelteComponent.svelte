<script lang="ts" generics="T extends ComponentType">
  import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

  export let component: T;
  export let props: ComponentProps<InstanceType<T>>;

  let target: HTMLElement | null = null;
  let prevComponent: SvelteComponent | null = null;

  $: if (component && props && target) {
    if (prevComponent) {
      prevComponent.$destroy();
    }

    prevComponent = new component({ target, props, hydrate: true });
  }
</script>

<div bind:this={target} />
