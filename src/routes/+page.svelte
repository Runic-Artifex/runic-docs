<script lang="ts">
  import { resolve } from '$app/paths';
  import ActionLink from '$lib/components/ActionLink.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { products } from '$lib/docs-data';
</script>

<svelte:head>
  <title>Build one application model across .NET surfaces · Runic Artifex</title
  >
  <meta
    name="description"
    content="Runic Artifex is a family of independent, NativeAOT-minded tools for application architecture, UI, orchestration, assets, localization, and command lines."
  />
</svelte:head>

<div>
  <section class="hero shell">
    <div class="hero-copy">
      <p class="eyebrow">Runic Artifex ecosystem</p>
      <h1>Build one application model across .NET surfaces.</h1>
      <p class="lede">
        Independent tools for WebUI, desktop, application bridges, headless
        orchestration, assets, localization, and command lines—designed to
        compose without sharing one release train.
      </p>
      <div class="actions">
        <ActionLink href={resolve('/getting-started')}
          >Start with the preview</ActionLink
        >
        <ActionLink href={resolve('/architecture')} variant="outline"
          >Understand the boundaries</ActionLink
        >
      </div>
    </div>
    <Card.Root
      class="hero-map"
      aria-label="Runic Artifex product relationship summary"
    >
      <div class="map-core">
        <span>Application composition</span><strong>Runic Toolkit</strong>
      </div>
      <div class="map-ring">
        <span>Bridge</span><span>Flow</span><span>Assets</span><span
          >Translations</span
        ><span>Editor</span><span>CLI</span><span>CsWebUi</span>
      </div>
      <p>Products own their cores and official integrations.</p>
    </Card.Root>
  </section>

  <section class="section shell">
    <div class="section-heading split-heading">
      <div>
        <p class="eyebrow">Choose your layer</p>
        <h2>Use one product or compose the ecosystem.</h2>
      </div>
      <a class="text-link" href={resolve('/products')}>Compare all products →</a
      >
    </div>
    <div class="product-grid">
      {#each products as product (product.slug)}
        <ProductCard {product} label={`Explore ${product.shortName}`} />
      {/each}
    </div>
  </section>

  <section class="section shell">
    <Card.Root class="principle-panel">
      <div>
        <p class="eyebrow">The ownership rule</p>
        <h2>Integrations belong to the product doing the integrating.</h2>
      </div>
      <div
        class="mini-flow"
        aria-label="Runic Flow integration dependency direction"
      >
        <span>RunicFlow</span><b>→</b><strong
          >RunicFlow.ApplicationBridge</strong
        ><b>←</b><span>RunicToolkit.ApplicationBridge</span>
      </div>
      <p>
        Cores remain portable. Adapters depend on both sides. Git history,
        versioning, and release decisions stay with the product that owns the
        behavior.
      </p>
    </Card.Root>
  </section>

  <Separator class="shell" />
  <section class="section shell launch-strip">
    <div>
      <Badge variant="outline" class="mb-4 border-primary/30 text-primary"
        >First public preview</Badge
      >
      <h2>The source is public; the first package previews are next.</h2>
      <p>
        Current main branches and exact candidate artifacts are green. Public
        registry publication remains gated on trusted publishers and final
        registry acceptance checks.
      </p>
    </div>
    <ActionLink href={resolve('/releases')} variant="outline"
      >See current release status</ActionLink
    >
  </section>
</div>
