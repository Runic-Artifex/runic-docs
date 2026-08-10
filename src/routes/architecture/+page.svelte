<script lang="ts">
  import ContentCard from '$lib/components/ContentCard.svelte';
</script>

<svelte:head>
  <title>Architecture · Runic Artifex</title>
  <meta
    name="description"
    content="The ownership and dependency rules that keep Runic Artifex products independent."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Architecture</p>
    <h1>Ownership and dependency direction are separate decisions.</h1>
    <p class="lede">
      A product owns the behavior it contributes. An integration depends on both
      cores. Neither core depends back on the integration.
    </p>
  </section>
  <section class="content-grid shell">
    <ContentCard
      eyebrow="Canonical seam"
      title="Flow controls its Toolkit integration"
      full
    >
      <div class="mini-flow">
        <span>RunicFlow<br /><small>Headless core</small></span><b>→</b><strong
          >RunicFlow.ApplicationBridge<br /><small>Owned by Flow</small></strong
        ><b>←</b><span
          >RunicToolkit.ApplicationBridge<br /><small
            >Application boundary</small
          ></span
        >
      </div>
    </ContentCard>
    <ContentCard eyebrow="Product autonomy" title="Independent histories">
      <p>
        Flow, Assets, Translations, Translations Editor, Command Line, Toolkit,
        and CsWebUi each version and release from their own repository.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Stable seams" title="Explicit compatibility">
      <p>
        Integrations pin exact cross-product versions during the preview.
        Compatibility is evidence recorded by consumers, frontend builds, and
        applicable NativeAOT runs.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Framework neutrality" title="Cores stay portable">
      <p>
        Runic Flow owns no UI state. Runic Assets owns no host. Runic
        Translations begins with .NET but defines language-neutral contracts.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Application boundary"
      title="The editor consumes the translation system"
      full
    >
      <p>
        Runic Translations owns schemas, compiler behavior, runtime contracts,
        generators, and authoring APIs. Runic Translations Editor consumes those
        surfaces as a downstream desktop application and owns translator UX,
        packaging, and releases.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Integration ownership"
      title="Behavior lives with its author"
    >
      <p>
        <code>RunicAssets.RunicToolkit</code> and
        <code>RunicFlow.ApplicationBridge</code> live and release with Assets and
        Flow respectively.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Application boundary"
      title="Schema first, renderer last"
      full
    >
      <p>
        Effect Schema is the authority for Application Bridge wire values.
        Deterministic JSON Schema and a canonical manifest feed the
        reflection-free C# generator. UI frameworks then project validated
        application events into their own state systems without owning transport
        lifecycle.
      </p>
    </ContentCard>
  </section>
</div>
