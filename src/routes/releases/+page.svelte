<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Item from '$lib/components/ui/item';
  import * as Table from '$lib/components/ui/table';

  const train = [
    ['CsWebUi', '2.5.0-beta.4.4', 'Available on nuget.org'],
    [
      'Runic Command Line',
      '0.1.0-preview.4.1 · verified, unpublished',
      'Independent',
    ],
    [
      'Runic Translations',
      '0.1.0-preview.4.3 · verified, unpublished',
      'Independent; NuGet and npm paths',
    ],
    [
      'Runic Translations Editor',
      'First preview pending',
      'After Runic Translations publication',
    ],
    [
      'Runic Svelte integrations',
      '0.1.0-preview.8.1 · verified, unpublished',
      'Before the Toolkit public template gate',
    ],
    [
      'Runic Vite integration',
      '0.1.0-preview.8.1 · verified, unpublished',
      'Before the Toolkit public template gate',
    ],
    [
      'Runic Toolkit',
      '0.1.0-preview.22.1 · verified, unpublished',
      'After Svelte and Vite integrations',
    ],
    [
      'Runic Assets',
      '0.1.0-preview.17.1 · verified, unpublished',
      'After Runic Toolkit',
    ],
    [
      'Runic Flow',
      '0.1.0-preview.5.1 · verified, unpublished',
      'After Runic Toolkit',
    ],
  ] as const;
</script>

<svelte:head>
  <title>Releases · Runic Artifex</title>
  <meta
    name="description"
    content="Current public preview readiness and registry safety model for Runic Artifex."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Release policy</p>
    <h1>Verify once. Publish the same artifacts.</h1>
    <p class="lede">
      Source repositories are public and exact candidates are verified. Registry
      jobs remain gated on protected environments, trusted publishers, and final
      registry acceptance.
    </p>
  </section>
  <section class="content-grid shell">
    <div class="release-steps">
      <Item.Root class="release-step" variant="outline">
        <Item.Content>
          <Item.Title class="line-clamp-none">
            <h2 class="font-serif text-xl">Freeze exact source commits</h2>
          </Item.Title>
          <Item.Description class="line-clamp-none">
            Finish product changes and select immutable release inputs from
            green main branches.
          </Item.Description>
        </Item.Content>
        <Item.Actions><Badge>Complete</Badge></Item.Actions>
      </Item.Root>
      <Item.Root class="release-step" variant="outline">
        <Item.Content>
          <Item.Title class="line-clamp-none">
            <h2 class="font-serif text-xl">Build fresh candidates</h2>
          </Item.Title>
          <Item.Description class="line-clamp-none">
            Restore, test, pack, and run frontend, downstream-consumer, and
            applicable NativeAOT gates without sibling source dependencies.
          </Item.Description>
        </Item.Content>
        <Item.Actions><Badge>Complete</Badge></Item.Actions>
      </Item.Root>
      <Item.Root class="release-step" variant="outline">
        <Item.Content>
          <Item.Title class="line-clamp-none">
            <h2 class="font-serif text-xl">Cross the documentation gate</h2>
          </Item.Title>
          <Item.Description class="line-clamp-none">
            Review the portal against those exact artifacts and remove stale
            product or version claims.
          </Item.Description>
        </Item.Content>
        <Item.Actions><Badge variant="outline">In progress</Badge></Item.Actions
        >
      </Item.Root>
      <Item.Root class="release-step" variant="outline">
        <Item.Content>
          <Item.Title class="line-clamp-none">
            <h2 class="font-serif text-xl">Enable trusted publishing</h2>
          </Item.Title>
          <Item.Description class="line-clamp-none">
            Use protected environments and OIDC for NuGet and npm. Use a
            short-lived bootstrap token only where npm requires a first package
            record.
          </Item.Description>
        </Item.Content>
        <Item.Actions
          ><Badge variant="outline">Launch setup</Badge></Item.Actions
        >
      </Item.Root>
    </div>
    <div class="package-table">
      <Table.Root>
        <Table.Caption class="sr-only">
          Runic Artifex release candidates and publication order
        </Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head scope="col">Product</Table.Head>
            <Table.Head scope="col">Public status</Table.Head>
            <Table.Head scope="col">Order constraint</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each train as [name, status, constraint] (name)}
            <Table.Row>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{status}</Table.Cell>
              <Table.Cell>{constraint}</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </section>
</div>
