<script lang="ts">
  import { resolve } from '$app/paths';
  import ActionLink from '$lib/components/ActionLink.svelte';
  import Notice from '$lib/components/Notice.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import type { Product } from '$lib/docs-data';

  let { product }: { product: Product } = $props();
  let isApplication = $derived(product.kind === 'application');
  let isPublished = $derived((product.install?.length ?? 0) > 0);
</script>

<svelte:head>
  <title>{product.name} · Runic Artifex</title>
  <meta name="description" content={product.summary} />
</svelte:head>

<div>
  <section class="doc-hero shell">
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href={resolve('/products')}>Products</Breadcrumb.Link
          >
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>{product.name}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
    <div class="product-title-row">
      <span
        class="product-mark product-logo large"
        style:background-image={`url(${product.icon})`}
        aria-hidden="true"
      ></span>
      <div>
        <Badge variant="outline" class="mb-2 border-primary/30 text-primary"
          >{product.kicker}</Badge
        >
        <h1>{product.name}</h1>
      </div>
    </div>
    <p class="lede">{product.description}</p>
    <div class="actions">
      <ActionLink href={`https://github.com/Runic-Artifex/${product.slug}`}
        >View source</ActionLink
      >
      {#if product.slug === 'runic-toolkit'}
        <ActionLink href={resolve('/application-bridge')} variant="outline"
          >Application Bridge guide</ActionLink
        >
      {/if}
      {#if product.related}
        <ActionLink href={resolve(product.related.href)} variant="outline"
          >{product.related.label}</ActionLink
        >
      {/if}
      {#if !isApplication}
        <ActionLink href={resolve('/packages')} variant="outline"
          >Package catalog</ActionLink
        >
      {/if}
    </div>
  </section>

  <Separator class="shell" />
  <div class="doc-layout shell">
    <aside class="on-this-page">
      <strong>On this page</strong>
      <a href={resolve('/products/[slug]#choose', { slug: product.slug })}
        >When to choose it</a
      >
      <a href={resolve('/products/[slug]#boundaries', { slug: product.slug })}
        >Boundaries</a
      >
      <a href={resolve('/products/[slug]#install', { slug: product.slug })}
        >{isApplication ? 'Release' : 'Install'}</a
      >
      <a href={resolve('/products/[slug]#packages', { slug: product.slug })}
        >{isApplication ? 'Artifacts' : 'Packages'}</a
      >
    </aside>
    <article class="doc-content">
      <section id="choose">
        <p class="eyebrow">Fit</p>
        <h2>When to choose it</h2>
        <ul class="check-list">
          {#each product.bestFor as item (item)}<li>{item}</li>{/each}
        </ul>
      </section>
      <section id="boundaries">
        <p class="eyebrow">Architecture</p>
        <h2>What stays outside</h2>
        <ul>
          {#each product.boundaries as item (item)}<li>{item}</li>{/each}
        </ul>
      </section>
      <section id="install">
        <p class="eyebrow">Preview</p>
        <h2>{isApplication ? 'Download a release' : 'Prepare to install'}</h2>
        <Notice
          title={isApplication
            ? 'First release pending'
            : isPublished
              ? 'Available on the public registry'
              : 'Publication pending'}
        >
          <p>
            {isApplication
              ? 'The editor packaging pipeline produces self-contained desktop archives. Signed public downloads will appear in the editor repository without coupling its release cadence to the translation package family.'
              : isPublished
                ? 'This version is available from its public registry. Keep exact preview versions in reproducible applications.'
                : 'Exact candidate artifacts have passed their public-source verification workflows. Install commands will be added only after the matching registry artifacts are published and accepted.'}
          </p>
        </Notice>
        {#each product.install ?? [] as command (command)}<pre><code
              >{command}</code
            ></pre>{/each}
      </section>
      <section id="packages">
        <p class="eyebrow">Owned surface</p>
        <h2>{isApplication ? 'Release artifacts' : 'Package family'}</h2>
        <div class="package-list">
          {#each product.packages as name (name)}<code>{name}</code>{/each}
          {#each product.npmPackages ?? [] as name (name)}<code>{name}</code
            >{/each}
          {#each product.artifacts ?? [] as name (name)}<code>{name}</code
            >{/each}
        </div>
        <p>
          {isApplication ? 'Release status' : 'Public candidate status'}:
          <code>{product.version}</code>
        </p>
      </section>
      <Card.Root class="next-card" size="sm">
        <Card.Header>
          <Card.Description>Next</Card.Description>
          <Card.Title class="font-serif text-xl">
            <a href={resolve('/architecture')}
              >See how product integrations preserve dependency direction →</a
            >
          </Card.Title>
        </Card.Header>
      </Card.Root>
    </article>
  </div>
</div>
