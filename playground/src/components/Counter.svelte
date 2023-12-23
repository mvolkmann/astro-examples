<script>
  export let label = '';

  let count = 0;
</script>

<div class="row">
  {#if label}
    <div>{label}</div>
  {/if}
  <button disabled={count <= 0} on:click={() => count--}>-</button>
  <h1>{count}</h1>
  <button on:click={() => count++}>+</button>
</div>

<style>
  button, h1 {
    margin: 0;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>