<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { buildUrlForPage } from '$lib/datocms/gqlUrlBuilder/page';
  import { InlineItemFragment } from './fragments';

  interface Props {
    link: FragmentOf<typeof InlineItemFragment>;
  }

  let { link }: Props = $props();

  let unmaskedLink = $derived(readFragment(InlineItemFragment, link));
</script>

<!--
  If a structured text includes a reference to another DatoCMS record, it's
  up to you to decide how to render them. The visual representation lives
  here; the URL is owned by the per-model URL builder, composed via the URL
  fragment.
-->

{#if unmaskedLink.__typename === 'PageRecord'}
  <a href={buildUrlForPage(unmaskedLink)} class="pill" data-datocms-content-link-boundary>
    {unmaskedLink.title}
  </a>
{/if}
