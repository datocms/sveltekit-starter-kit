<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';
  import type { LayoutData } from './$types';
  import DraftModeToggler from '$lib/components/DraftModeToggler/index.svelte';

  export let data: LayoutData;
  $: subscription = querySubscription(data.subscription);
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

<header>
  <h1>DatoCMS + SvelteKit Starter Kit</h1>
  <nav>
    <a class="navlink" href="https://www.datocms.com/docs/svelte"> 📚 Full Integration Guide </a>
    <DraftModeToggler />
  </nav>
</header>

<main>
  <slot />
</main>
