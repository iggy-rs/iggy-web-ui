<script lang="ts">
  import Icon from './Icon.svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import Button from './Button.svelte';

  let darkMode = true;

  const setDarkMode = () => {
    darkMode = true;
    localStorage.setItem('appTheme', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  };
  const setLightMode = () => {
    darkMode = false;
    localStorage.setItem('appTheme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  };

  const setAppTheme = () => {
    if (!browser) return;

    if (localStorage.getItem('appTheme') === 'dark') {
      setDarkMode();
      return;
    } else if (localStorage.getItem('appTheme') === 'light') {
      setLightMode();
      return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  setAppTheme();
</script>

<button>
  <Button variant="rounded" on:click={() => (darkMode ? setLightMode() : setDarkMode())}>
    {#key darkMode}
      <div in:fade={{ duration: 200 }}>
        <Icon name={darkMode ? 'moon' : 'sun'} className="dark:text-white" />
      </div>
    {/key}
  </Button>
</button>
