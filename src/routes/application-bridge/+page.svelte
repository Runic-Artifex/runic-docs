<script lang="ts">
  import ActionLink from '$lib/components/ActionLink.svelte';
  import ContentCard from '$lib/components/ContentCard.svelte';
  import Notice from '$lib/components/Notice.svelte';
</script>

<svelte:head>
  <title>Application Bridge · Runic Artifex</title>
  <meta
    name="description"
    content="The official Effect Schema-first boundary between Runic Toolkit frontends and NativeAOT-safe .NET application handlers."
  />
</svelte:head>

<div>
  <section class="page-hero shell">
    <p class="eyebrow">Runic Toolkit</p>
    <h1>Named application concepts cross one validated boundary.</h1>
    <p class="lede">
      The Application Bridge is the official frontend boundary for Runic
      Toolkit. It replaces generic ViewModel projection with explicit commands,
      receipts, snapshots, events, and public errors.
    </p>
    <div class="actions">
      <ActionLink
        href="https://github.com/Runic-Artifex/runic-toolkit-examples/tree/main/samples/04-SvelteKitSetupApplication"
        >Study the SvelteKit vertical</ActionLink
      >
      <ActionLink
        variant="outline"
        href="https://github.com/Runic-Artifex/runic-toolkit/blob/main/docs/guides/application-bridge.md"
        >Repository guide</ActionLink
      >
    </div>
  </section>
  <section class="content-grid shell">
    <ContentCard
      eyebrow="Contract pipeline"
      title="Effect Schema is the authority"
      full
    >
      <div class="mini-flow">
        <span>Effect Schema<br /><small>encoded wire values</small></span><b
          >→</b
        ><strong
          >JSON Schema + manifest<br /><small>committed and fingerprinted</small
          ></strong
        ><b>→</b><span
          >C# generator<br /><small>reflection-free dispatch</small></span
        >
      </div>
      <p>
        Contract generation is deterministic and CI rejects stale artifacts. C#
        compilation reads only committed artifacts; it never starts Node or
        infers the public contract from ViewModels or CLR reflection.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Frontend runtime" title="One Effect owner">
      <p>
        One <code>ManagedRuntime</code> owns the Application Bridge service, transport,
        scope, and event stream. UI components call a controller instead of scattering
        Effect execution through the render tree.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Layers" title="Same application interface">
      <p>
        <code>CsWebUiApplicationBridgeLive</code>,
        <code>MockApplicationBridge</code>, and fault-injection Layers expose
        the same semantics. Renderer code remains independent of the active
        transport.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Host runtime" title="NativeAOT by construction">
      <p>
        Generated DTOs, strict codecs, exhaustive dispatch, and typed event
        publishers avoid reflection. Sessions own bounded admission, revisions,
        sequence numbers, duplicate rejection, operations, and deterministic
        teardown.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Security" title="Privileged choices remain native">
      <p>
        The frontend can request destination selection but cannot send a
        privileged path. The host returns an opaque selection ID plus
        display-safe metadata and validates that handle when work begins.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Official frontend path"
      title="Svelte 5, SvelteKit, Vite 8, and Vite DevTools"
      full
    >
      <p>
        <code>@runic-artifex/svelte</code> projects one Application Bridge
        controller into Svelte 5 runes and context.
        <code>@runic-artifex/sveltekit</code>
        owns the static SPA adapter and native-host page options.
        <code>@runic-artifex/vite-plugin-runic-toolkit</code>
        owns Toolkit development metadata, bounded inspection, and HMR resources.
        The official
        <code>@vitejs/devtools</code> plugin remains the DevTools host and is excluded
        from production output.
      </p>
      <p>
        These integrations intentionally support Svelte 5 only. Framework
        adapters do not duplicate transport, reconnect, or protocol state.
      </p>
    </ContentCard>
    <ContentCard
      eyebrow="Wire vocabulary"
      title="Describe the application, not its implementation"
      full
    >
      <div class="package-list">
        <code>InitializeApplication</code><code>SelectDestination</code><code
          >Navigate</code
        ><code>StartInstallation</code><code>OperationProgress</code><code
          >OperationCompleted</code
        ><code>OperationFailed</code><code>CancelOperation</code>
      </div>
      <p>
        There is no generic <code>setProperty</code>, numeric member identifier,
        or ViewModel
        <code>execute</code> operation. Long-running work returns an operation ID
        promptly; progress and terminal outcomes arrive through the validated Effect
        Stream.
      </p>
    </ContentCard>
    <ContentCard eyebrow="Install" title="Wait for registry publication" full>
      <Notice title="Publication pending">
        <p>
          Exact Toolkit, Svelte, and Vite candidates have passed their
          public-source verification workflows. Install commands will return
          here after the matching NuGet and npm artifacts complete
          trusted-publisher activation and final registry acceptance.
        </p>
      </Notice>
    </ContentCard>
    <ContentCard
      eyebrow="Reference proof"
      title="The package-only Setup applications close the loop"
      full
    >
      <p>
        The neutral and SvelteKit reference applications cover initialization,
        backend-authoritative navigation, opaque destination selection,
        installation receipts, progress, completion, failure, cancellation,
        recovery, development DevTools, deterministic production frontend
        output, NativeAOT, and real native-browser roundtrips.
      </p>
    </ContentCard>
  </section>
</div>
