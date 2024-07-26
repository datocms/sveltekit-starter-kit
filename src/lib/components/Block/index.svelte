<script lang="ts">
  import { readFragment, type FragmentOf } from '$lib/datocms/graphql';
  import ImageBlock from '$lib/components/Block/ImageBlock/index.svelte';
  import ImageGalleryBlock from '$lib/components/Block/ImageGalleryBlock/index.svelte';
  import { BlockFragment } from './fragments';

  export let block: FragmentOf<typeof BlockFragment>;

  $: unmaskedBlock = readFragment(BlockFragment, block);
</script>

<div>
  {#if unmaskedBlock.__typename === 'ImageBlockRecord'}
    <ImageBlock data={unmaskedBlock} />
  {:else if unmaskedBlock.__typename === 'ImageGalleryBlockRecord'}
    <ImageGalleryBlock data={unmaskedBlock} />
  {:else if unmaskedBlock.__typename === 'VideoBlockRecord'}
    <!--
      By using an await block, the component will not be included in the page's
      initial JavaScript bundle. This enables the deferred loading of heavy
      components, only when they are required.

      Read more: https://svelte.dev/docs/logic-blocks#await
    -->
    {#await import('./VideoBlock/index.svelte') then VideoBlock}
      <VideoBlock.default data={unmaskedBlock} />
    {/await}
  {/if}
</div>
