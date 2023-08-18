<script lang="ts">
  import Icon from './Icon.svelte';
  import type { iconType } from './Icon.svelte';
  import { page } from '$app/stores';
  import { twMerge } from 'tailwind-merge';
  import logo from '$lib/assets/logo.png';

  const navItems: { name: string; icon: iconType; href: string }[] = [
    {
      name: 'Overview',
      icon: 'home',
      href: '/overview'
    },
    {
      name: 'Streams',
      icon: 'stream',
      href: '/streams'
    },
    {
      name: 'Clients',
      icon: 'clients',
      href: '/clients'
    },
    {
      name: 'Logs',
      icon: 'logs',
      href: '/logs'
    }
  ];
</script>

<nav
  class="h-screen px-3 pb-7 pt-4 border-r flex flex-col items-center bg-shadeL300 dark:bg-shadeD1000"
>
  <a href="/overview" class="flex flex-col items-center gap-5">
    <span class="font-extrabold text-xl tracking-wide text-black dark:text-white"> IGGY </span>
    <img src={logo} class="h-[60px] mb-10" alt="iggy" />
  </a>

  <ul class="flex flex-col gap-7">
    {#each navItems as { name, icon, href }}
      {@const isActive = $page.url.pathname.includes(href)}
      <li>
        <a
          {href}
          class={twMerge(
            'p-2 block rounded-xl transition-colors  ring-2 ring-transparent',
            isActive && 'ring-black dark:ring-white',
            !isActive && 'dark:hover:bg-shadeD300'
          )}
        >
          <Icon name={icon} className="w-[27px] h-[27px] text-black dark:text-white" />
        </a>
      </li>
    {/each}
  </ul>
</nav>
