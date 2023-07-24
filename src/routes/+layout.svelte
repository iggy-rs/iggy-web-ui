<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import '../styles/app.css';
</script>

<div class="flex">
  <Navbar />

  <slot />
</div>
