<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { ImageBlockFragment } from './fragments';

  export let data: FragmentOf<typeof ImageBlockFragment>;

  $: unmaskedData = readFragment(ImageBlockFragment, data);
</script>

<figure>
  <!-- Display responsive image -->
  <ResponsiveImage data={unmaskedData.asset.responsiveImage} />
  <!-- Display image title -->
  <figcaption>{unmaskedData.asset.title}</figcaption>
</figure>
