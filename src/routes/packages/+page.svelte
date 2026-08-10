<script lang="ts">
  import { resolve } from '$app/paths';
  import ContentCard from '$lib/components/ContentCard.svelte';
  import * as Table from '$lib/components/ui/table';
  import { products } from '$lib/docs-data';

  const frontendIntegrations = [
    {
      name: '@runic-artifex/svelte',
      owner: 'runic-svelte',
      source: 'https://github.com/Runic-Artifex/runic-svelte',
      version: '0.1.0-preview.8.1 · verified, unpublished',
    },
    {
      name: '@runic-artifex/sveltekit',
      owner: 'runic-svelte',
      source: 'https://github.com/Runic-Artifex/runic-svelte',
      version: '0.1.0-preview.8.1 · verified, unpublished',
    },
    {
      name: '@runic-artifex/vite-plugin-runic-toolkit',
      owner: 'runic-vite',
      source: 'https://github.com/Runic-Artifex/runic-vite',
      version: '0.1.0-preview.8.1 · verified, unpublished',
    },
  ] as const;

  const rows = products.flatMap((product) => [
    ...product.packages.map((name) => ({ name, registry: 'NuGet', product })),
    ...(product.npmPackages ?? []).map((name) => ({
      name,
      registry: 'npm',
      product,
    })),
  ]);
</script>

<svelte:head>
  <title>Package catalog · Runic Artifex</title>
  <meta
    name="description"
    content="The NuGet and npm packages owned by each Runic Artifex product."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Package catalog</p>
    <h1>One owner for every public package.</h1>
    <p class="lede">
      Package families release independently. Exact candidates are verified;
      versions marked unpublished are not public install promises.
    </p>
  </section>
  <section class="content-grid shell">
    <div class="package-table">
      <Table.Root>
        <Table.Caption class="sr-only">
          Runic Artifex public package ownership and publication status
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">Package</Table.Head>
            <Table.Head scope="col">Registry</Table.Head>
            <Table.Head scope="col">Owner</Table.Head>
            <Table.Head scope="col">Public status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each rows as { name, registry, product } (`${registry}:${name}`)}
            <Table.Row>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{registry}</Table.Cell>
              <Table.Cell>
                <a href={resolve('/products/[slug]', { slug: product.slug })}
                  >{product.name}</a
                >
              </Table.Cell>
              <Table.Cell><code>{product.version}</code></Table.Cell>
            </Table.Row>
          {/each}
          {#each frontendIntegrations as integration (integration.name)}
            <Table.Row>
              <Table.Cell>{integration.name}</Table.Cell>
              <Table.Cell>npm</Table.Cell>
              <Table.Cell>{integration.owner}</Table.Cell>
              <Table.Cell><code>{integration.version}</code></Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
    <ContentCard
      eyebrow="Canonical names"
      title="Product and package identifiers agree"
      full
    >
      <p>
        Runic Translations is the product and repository name. <code
          >RunicTranslations.*</code
        >,
        <code>runic.translations/1</code>, and
        <code>@runic-artifex/vite-plugin-runic-translations</code> are the canonical
        identifiers.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Version policy"
      title="Exact during preview, explicit afterward"
      full
    >
      <p>
        Each repository releases one version across its owned package family.
        Cross-product dependencies remain exact while contracts settle.
        Applications decide their own update cadence.
      </p>
    </ContentCard>
  </section>
</div>
