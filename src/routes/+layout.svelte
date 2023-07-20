<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import '../styles/app.css';
</script>

<div class="flex">
  <Navbar />
  <div class="p-7">
    <slot />
  </div>
</div>
