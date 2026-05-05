<script lang="ts">
  import type { ItemLink } from 'datocms-structured-text-utils';
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { defaultMetaTransformer } from 'datocms-structured-text-generic-html-renderer';
  import { buildUrlForPage } from '$lib/datocms/gqlUrlBuilder/page';
  import { ItemLinkFragment } from './fragments';
  import type { Snippet } from 'svelte';

  interface Props {
    node: ItemLink;
    link: FragmentOf<typeof ItemLinkFragment>;
    children: Snippet;
  }

  let { node, link, children }: Props = $props();

  let unmaskedLink = $derived(readFragment(ItemLinkFragment, link));

  let { meta } = $derived(node);
  let transformedMeta = $derived(meta ? defaultMetaTransformer({ node, meta }) : null);
</script>

<!--
  Link-to-record components own their visual representation; the URL is
  built by the per-model URL builder. Renderer-provided meta (e.g. target,
  rel) is honored via {...transformedMeta}. Note: no
  `data-datocms-content-link-boundary` on link-to-record components — the
  renderer handles those boundaries.
-->

{#if unmaskedLink.__typename === 'PageRecord'}
  <a {...transformedMeta} href={buildUrlForPage(unmaskedLink)}>
    {@render children()}
  </a>
{/if}
