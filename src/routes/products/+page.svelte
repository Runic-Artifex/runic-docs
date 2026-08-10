<script lang="ts">
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { products } from '$lib/docs-data';
</script>

<svelte:head>
  <title>Products · Runic Artifex</title>
  <meta
    name="description"
    content="Choose the independent Runic Artifex product that owns the capability you need."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Product map</p>
    <h1>Independent products. Designed to compose.</h1>
    <p class="lede">
      Start at the narrowest boundary that solves your problem. Add Runic
      Toolkit only when you need the shared application-composition experience.
    </p>
  </section>
  <section class="shell product-grid section">
    {#each products as product (product.slug)}
      <ProductCard
        {product}
        label={product.kind === 'application'
          ? 'Editor and boundaries'
          : 'Packages and boundaries'}
      />
    {/each}
  </section>
</div>
