<script lang="ts">
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import VideoPlayer from '$lib/components/VideoPlayer/index.svelte';
  import { VideoBlockFragment } from './fragments';

  export let data: FragmentOf<typeof VideoBlockFragment>;

  // Read unmasked data from fragment
  $: unmaskedData = readFragment(VideoBlockFragment, data);
</script>

<figure>
  <!-- Render the video player component -->
  <VideoPlayer data={unmaskedData.asset} />
  <!-- Display the title of the video asset below the video player -->
  <figcaption>{unmaskedData.asset.title}</figcaption>
</figure>
