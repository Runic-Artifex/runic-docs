<script lang="ts">
  import { resolve } from '$app/paths';
  import ContentCard from '$lib/components/ContentCard.svelte';
  import Notice from '$lib/components/Notice.svelte';
</script>

<svelte:head>
  <title>Getting started · Runic Artifex</title>
  <meta
    name="description"
    content="Choose a Runic Artifex product and prepare for the first public preview."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Getting started</p>
    <h1>Begin at the capability boundary.</h1>
    <p class="lede">
      Runic Artifex is not one mandatory stack. Choose an independent product,
      then add integrations owned by that product when your application needs
      them.
    </p>
  </section>
  <section class="content-grid shell">
    <ContentCard eyebrow="01 · Choose" title="Pick the owner">
      <ul>
        <li>
          Need a desktop browser host? Start with <a
            href={resolve('/products/[slug]', { slug: 'cs-webui' })}>CsWebUi</a
          >.
        </li>
        <li>
          Need application composition? Start with <a
            href={resolve('/products/[slug]', { slug: 'runic-toolkit' })}
            >Runic Toolkit</a
          >.
        </li>
        <li>
          Need deterministic backend operations? Start with <a
            href={resolve('/products/[slug]', { slug: 'runic-flow' })}
            >Runic Flow</a
          >.
        </li>
        <li>
          Need localization contracts and builds? Start with <a
            href={resolve('/products/[slug]', { slug: 'runic-translations' })}
            >Runic Translations</a
          >.
        </li>
        <li>
          Need a translator-facing workspace? Use <a
            href={resolve('/products/[slug]', {
              slug: 'runic-translations-editor',
            })}>Runic Translations Editor</a
          >.
        </li>
      </ul>
    </ContentCard>
    <ContentCard
      eyebrow="02 · Inspect"
      title="Use the candidate status, not an old version list"
    >
      <p>
        CsWebUi is already public. Exact candidates for the other package
        families have passed their public-source verification workflows. The
        catalog names package ownership now and will show installable versions
        only after matching registry artifacts complete trusted-publisher setup
        and final acceptance.
      </p>
    </ContentCard>
    <ContentCard eyebrow="03 · Integrate" title="Let adapters point inward">
      <p>
        Runic Flow remains headless and frontend-neutral. <code
          >RunicFlow.ApplicationBridge</code
        >
        depends on Flow and Toolkit Application Bridge and is released by Flow.
      </p>
    </ContentCard>
    <ContentCard eyebrow="04 · Verify" title="Keep the application in control">
      <ul>
        <li>Pin exact product versions during the preview.</li>
        <li>
          Publish the final application with trimming and NativeAOT when
          supported.
        </li>
        <li>
          Do not add NuGet <code>packages.lock.json</code>; application package
          managers own resolution.
        </li>
        <li>
          Keep ordinary npm <code>package-lock.json</code> files for applications.
        </li>
      </ul>
    </ContentCard>
    <ContentCard eyebrow="Continue" title="Follow the boundary" full>
      <Notice title="Public launch is gated">
        <p>
          Source visibility can precede registry publication. Package commands
          will be published only after fresh candidates, downstream consumers,
          trusted publishers, and the documentation review all pass.
        </p>
      </Notice>
      <p>
        Continue with the <a
          class="text-link"
          href={resolve('/application-bridge')}>Application Bridge guide</a
        >, the
        <a class="text-link" href={resolve('/packages')}>package catalog</a>, or
        the
        <a class="text-link" href={resolve('/architecture')}>dependency rules</a
        >.
      </p>
    </ContentCard>
  </section>
</div>
