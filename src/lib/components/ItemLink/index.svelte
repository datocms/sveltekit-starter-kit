<script lang="ts">
  import type { ItemLink } from 'datocms-structured-text-utils';
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { defaultMetaTransformer } from 'datocms-structured-text-generic-html-renderer';
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
  If the structured text includes a link to another DatoCMS record,
  it's your decision to determine where the link should lead, or if
  you wish to customize its appearance:
-->

{#if unmaskedLink.__typename === 'PageRecord'}
  <a {...transformedMeta} href="/page/{unmaskedLink.slug}">
    {@render children()}
  </a>
{/if}
