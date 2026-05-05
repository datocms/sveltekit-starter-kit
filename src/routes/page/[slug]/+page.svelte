<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';
  import { isBlock, isInlineItem, isItemLink } from 'datocms-structured-text-utils';
  import Text from '$lib/components/Text/index.svelte';
  import Block from '$lib/components/Block/index.svelte';
  import InlineItem from '$lib/components/InlineItem/index.svelte';
  import ItemLink from '$lib/components/ItemLink/index.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);
</script>

{#if page}
  <!--
    The <Head> component provided by @datocms/svelte automates the creation of
    meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
  -->
  <Head data={page._seoMetaTags} />

  <h1>{page.title}</h1>

  <!--
    Structured Text is a JSON format similar to HTML, but with the advantage
    of a significantly reduced and tailored set of possible tags
    for editorial content, along with the capability to create hyperlinks
    to other DatoCMS records and embed custom DatoCMS blocks.

    <Text /> is the project-wide wrapper around <StructuredText /> from
    @datocms/svelte. It bakes in:
    - the data-datocms-content-link-group attribute (required by Visual
      Editing click-to-edit)
    - default node-override components (e.g. code blocks, headings with
      anchor links)

    Per-route concerns — block / inline-record / link-to-record renderers,
    which depend on which models THIS specific structured-text field
    accepts — are still passed in here.
  -->
  <Text
    data={page.structuredText}
    components={[
      [isBlock, Block],
      [isInlineItem, InlineItem],
      [isItemLink, ItemLink],
    ]}
  />

  <footer>Published at {page._firstPublishedAt}</footer>
{/if}
