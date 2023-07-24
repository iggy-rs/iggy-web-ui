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

<nav class="h-screen px-3 py-7 border-r flex flex-col items-center">
  <img src={logo} class="h-[60px] mb-10" alt="iggy" />
  <ul class="flex flex-col gap-7">
    {#each navItems as { name, icon, href }}
      <li class=" ">
        <a
          {href}
          class={twMerge(
            'p-2 block rounded-xl transition-colors hover:bg-slate-200 ring-2 ring-transparent',
            $page.url.pathname.includes(href) && 'ring-black'
          )}
        >
          <Icon name={icon} className="w-[27px] h-[27px]" />
        </a>
      </li>
    {/each}
  </ul>
</nav>
