<script context="module" lang="ts">
  import { writable } from 'svelte/store';

  const result = writable<boolean | undefined>(undefined);

  export function openDeleteResourcePopup(): Promise<boolean> {
    return new Promise((res) => {
      result.subscribe((value) => {
        if (value === true || value === false) res(value);
      });
    });
  }
</script>

<script lang="ts">
    
</script>
