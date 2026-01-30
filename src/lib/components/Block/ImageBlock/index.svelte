<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { ImageBlockFragment } from './fragments';

  interface Props {
    data: FragmentOf<typeof ImageBlockFragment>;
  }

  let { data }: Props = $props();

  let unmaskedData = $derived(readFragment(ImageBlockFragment, data));
</script>

<figure>
  <!-- Display responsive image -->
  <ResponsiveImage data={unmaskedData.asset.responsiveImage} />
  <!-- Display image title -->
  <figcaption>{unmaskedData.asset.title}</figcaption>
</figure>
