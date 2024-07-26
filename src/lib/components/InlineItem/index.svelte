<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import { InlineItemFragment } from './fragments';

  export let link: FragmentOf<typeof InlineItemFragment>;

  $: unmaskedLink = readFragment(InlineItemFragment, link);
</script>

<!--
  If a structured text includes a reference to another DatoCMS
  record, it's up to you to decide how to render them:
-->

{#if unmaskedLink.__typename === 'PageRecord'}
  <a href="/" class="pill">{unmaskedLink.title}</a>
{/if}
