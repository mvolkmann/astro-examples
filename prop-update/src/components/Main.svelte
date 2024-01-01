<script>
  import ShowCount2 from './ShowCount2.svelte';

  let count = 0;
</script>

<div>
  <div>Svelte count = {count}</div>
  <button on:click={() => count++}>Increment</button>
  <ShowCount2 {count} />
</div>
