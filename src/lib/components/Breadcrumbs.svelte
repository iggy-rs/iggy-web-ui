<script lang="ts">
  import { page } from '$app/stores';
  import { typedRoute } from '$lib/types/appRoutes';
  import Icon from './Icon.svelte';
  import { isNumber } from '$lib/utils/parsers';
  import { twMerge } from 'tailwind-merge';

  $: parts = $page.url.pathname
    .split('/')
    .filter((item) => item !== '')
    //remove dashboard
    .slice(1);

  $: crumbs = parts.map((s, i) => {
    const path = `/dashboard/${parts.slice(0, i + 1).join('/')}`;

    if (isNumber(parts[i])) {
      return {
        path,
        label: `${parts[i - 1].slice(0, -1)}-${parts[i]}`
      };
    }

    return {
      path,
      label: s
    };
  });
</script>

<div class="flex items-center">
  <a href={typedRoute('/dashboard/overview')}
    ><Icon name="home" class="dark:fill-shadeD900 dark:stroke-white  mr-2" /></a
  >

  <span class="flex mr-2">
    <span class="text-shadeL800">/</span>
  </span>

  {#each crumbs as { path, label }, idx (idx)}
    {@const isLast = idx === crumbs.length - 1}

    {#if isLast}
      <span class="flex ml-1">
        <span class="text-color font-semibold">{label}</span>
      </span>
    {:else}
      <a href={path} class="flex ml-1">
        <span class={twMerge('font-medium text-gray-600 dark:text-shadeL800')}>{label}</span>
        <span class="font-medium text-shadeL800 w-[10px] flex items-center justify-center ml-1"
          >/</span
        >
      </a>
    {/if}
  {/each}
</div>
