<script>
  // Svelte components cannot import and use Astro layouts.
  // import Layout from '../layouts/Layout.astro';
  const colors = ['red', 'green', 'blue'];
</script>

<ul>
  {#each colors as color}
    <li class="text-{color}-500">{color}</li>
  {/each}
</ul>

<style>
  li {
    font-weight: bold;
    list-style-type: disc;
    margin-left: 1.2rem;
  }
</style>
