<script lang="ts">
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import VideoPlayer from '$lib/components/VideoPlayer/index.svelte';
  import { VideoBlockFragment } from './fragments';

  interface Props {
    data: FragmentOf<typeof VideoBlockFragment>;
  }

  let { data }: Props = $props();

  // Read unmasked data from fragment
  let unmaskedData = $derived(readFragment(VideoBlockFragment, data));
</script>

<figure>
  <!-- Render the video player component -->
  <VideoPlayer data={unmaskedData.asset} />
  <!-- Display the title of the video asset below the video player -->
  <figcaption>{unmaskedData.asset.title}</figcaption>
</figure>
