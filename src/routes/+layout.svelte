<script>
  import AppModals from '$lib/components/Modals/AppModals.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import '../styles/app.css';
</script>

<AppModals />

<div class="flex">
  <Navbar />

  <slot />
</div>
