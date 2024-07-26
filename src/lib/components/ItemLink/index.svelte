<script lang="ts">
  import type { ItemLink } from 'datocms-structured-text-utils';
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { defaultMetaTransformer } from 'datocms-structured-text-generic-html-renderer';
  import { ItemLinkFragment } from './fragments';

  export let node: ItemLink;
  export let link: FragmentOf<typeof ItemLinkFragment>;

  $: unmaskedLink = readFragment(ItemLinkFragment, link);

  $: ({ meta } = node);
  $: transformedMeta = meta ? defaultMetaTransformer({ node, meta }) : null;
</script>

<!--
  If the structured text includes a link to another DatoCMS record,
  it's your decision to determine where the link should lead, or if
  you wish to customize its appearance:
-->

{#if unmaskedLink.__typename === 'PageRecord'}
  <a {...transformedMeta} href="/">
    <slot />
  </a>
{/if}
