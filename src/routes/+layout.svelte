<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';
  import type { LayoutData } from './$types';
  import DraftModeToggler from '$lib/components/DraftModeToggler/index.svelte';
  import ContentLink from '$lib/components/ContentLink/index.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    data: LayoutData;
    children: Snippet;
  }

  let { data, children }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/datocms/nextjs-starter-kit/src/app/global.css"
  />
</svelte:head>

<!--
  The <Head> component provided by @datocms/svelte automates the creation of
  meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
-->
<Head data={$subscription.data?._site.faviconMetaTags} />

<!--
  Enable click-to-edit overlays in draft mode only.

  The ContentLink component provides two editing experiences:
  1. On the standalone website: Click any content to open DatoCMS editor in a new tab
  2. Inside Web Previews plugin Visual mode: Click content to instantly edit in the side panel

  Only rendered in draft mode since the required stega-encoded metadata
  is only included in draft content responses (see queries.ts).
-->
{#if data.draftModeEnabled}
  <ContentLink />
{/if}

<header>
  <h1>DatoCMS + SvelteKit Starter Kit</h1>
  <nav>
    <a class="navlink" href="https://www.datocms.com/docs/svelte"> 📚 Full Integration Guide </a>
    <DraftModeToggler />
  </nav>
</header>

<main>
  {@render children()}
</main>
