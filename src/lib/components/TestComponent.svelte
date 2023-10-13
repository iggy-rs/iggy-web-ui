<script lang="ts">
  function onItemClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    console.log(e.target, 'clicked');
    console.log('clientX', e.clientX);
    console.log('pageX', e.pageX);
    console.log('screenX', e.screenX);
    console.log('offsetX', e.offsetX);
  }
</script>

<div class="bg-orange-400 p-5 w-[300px] h-[150px]" on:click={onItemClick} />
