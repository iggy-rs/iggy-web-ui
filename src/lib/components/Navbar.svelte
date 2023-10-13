<script lang="ts">
  import Icon from './Icon.svelte';
  import type { iconType } from './Icon.svelte';
  import { page } from '$app/stores';
  import { twMerge } from 'tailwind-merge';
  import logo from '$lib/assets/logo.png';
  import { tooltip } from '$lib/actions/tooltip';
  import { typedRoute } from '$lib/types/appRoutes';

  const navItems: { name: string; icon: iconType; href: string }[] = [
    {
      name: 'Overview',
      icon: 'home',
      href: typedRoute('/dashboard/overview')
    },
    {
      name: 'Streams',
      icon: 'stream',
      href: typedRoute('/dashboard/streams')
    },
    {
      name: 'Clients',
      icon: 'clients',
      href: typedRoute('/dashboard/clients')
    },
    {
      name: 'Logs',
      icon: 'logs',
      href: typedRoute('/dashboard/logs')
    },
    {
      name: 'Settings',
      icon: 'settings',
      href: typedRoute('/dashboard/settings')
    }
  ];
</script>

<nav
  class="h-screen min-w-[90px] max-w-[90px] pb-7 pt-4 border-r flex flex-col items-center bg-shadeL300 dark:bg-shadeD1000"
>
  <a href={typedRoute('/dashboard/overview')} class="flex flex-col items-center gap-5">
    <span class="font-extrabold text-xl tracking-wide text-black dark:text-white"> IGGY </span>
    <div class="w-[50px] h-[60px] mb-5">
      <img src={logo} class="w-[50px]" alt="iggy" />
    </div>
  </a>

  <ul class="flex flex-col gap-7">
    {#each navItems as { name, icon, href }}
      {@const isActive = $page.url.pathname.includes(href)}
      <li>
        <div use:tooltip={{ placement: 'right' }}>
          <a
            {href}
            data-trigger
            class={twMerge(
              'p-2 block rounded-xl transition-colors  ring-2 ring-transparent',
              isActive && 'ring-black dark:ring-white',
              !isActive && 'hoverable'
            )}
          >
            <Icon name={icon} className="w-[27px] h-[27px] text-black dark:text-white" />
          </a>
          <div class="tooltip">
            {name}
          </div>
        </div>
      </li>
    {/each}
  </ul>

  <!-- <form method="POST" action="/auth/logout" class="mt-auto">
    <button
      type="submit"
      class={twMerge(
        'p-2  mt-auto rounded-xl transition-colors  ring-2 ring-transparent dark:hover:bg-shadeD300'
      )}
      use:tooltip={{ placement: 'right' }}
    >
      <div class="tooltip">Logout</div>
      <Icon name={'logout'} className="w-[27px] h-[27px] text-black dark:text-white" />
    </button>
  </form> -->
</nav>
