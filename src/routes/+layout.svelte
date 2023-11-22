<script lang="ts">
  import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
  import ThemeController from '$lib/components/ThemeController.svelte';
  import '../styles/app.css';
</script>

<ThemeController />
<LoadingIndicator />

<slot />
