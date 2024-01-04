<script>
  export let label = "";
  export let count = 0;
</script>

<div class="row">
  {#if label}
    <div>{label}</div>
  {/if}
  <button disabled={count <= 0} on:click={() => count--}>-</button>
  <div>{count}</div>
  <button on:click={() => count++}>+</button>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
