<script>
  import {count} from '../stores.ts';

  export let label = '';
</script>

<div class="row">
  {#if label}
    <div>{label}</div>
  {/if}
  <button disabled={$count <= 0} on:click={() => count.set($count - 1)}>-</button>
  <div>{$count}</div>
  <button on:click={() => count.set($count + 1)}>+</button>
</div>

<style>
  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>