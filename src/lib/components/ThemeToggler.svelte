<script lang="ts">
  import Icon from './Icon.svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import Button from './Button.svelte';

  let darkMode = true;

  const setDarkMode = () => {
    darkMode = true;
    localStorage.setItem('appTheme', 'dark');
    document.body.classList.add('transitions-disabled');
    document.documentElement.classList.add('dark');
    const _ = window.getComputedStyle(document.body).opacity;
    document.body.classList.remove('transitions-disabled');
  };
  const setLightMode = () => {
    darkMode = false;
    localStorage.removeItem('appTheme');
    document.body.classList.add('transitions-disabled');
    document.documentElement.classList.remove('dark');
    const _ = window.getComputedStyle(document.body).opacity;
    document.body.classList.remove('transitions-disabled');
  };

  const setAppTheme = () => {
    if (!browser) return;

    if (localStorage.getItem('appTheme') === 'dark') {
      setDarkMode();
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode();
    }
  };

  setAppTheme();
</script>

<button>
  <Button variant="rounded" on:click={() => (darkMode ? setLightMode() : setDarkMode())}>
    <!-- {#key darkMode}
      <div in:fade={{ duration: 200 }}>
        <Icon name={darkMode ? 'moon' : 'sun'} class="dark:text-white" />
      </div>
    {/key} -->
    <Icon name="moon" />
  </Button>
</button>
