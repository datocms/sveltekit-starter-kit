<script lang="ts">
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { ImageGalleryBlockFragment } from './fragments';

  export let data: FragmentOf<typeof ImageGalleryBlockFragment>;

  // Read unmasked data from fragment
  $: unmaskedData = readFragment(ImageGalleryBlockFragment, data);
</script>

<div class="gallery">
  <div>
    {#each unmaskedData.assets as asset (asset.id)}
      <figure>
        <!-- Display responsive image for each asset -->
        <ResponsiveImage data={asset.responsiveImage} imgStyle="width: auto;" />
        <!-- Display title for each asset -->
        <figcaption>{asset.title}</figcaption>
      </figure>
    {/each}
  </div>
</div>
