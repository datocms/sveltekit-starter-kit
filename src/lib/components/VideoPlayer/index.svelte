<script lang="ts">
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { VideoPlayer } from '@datocms/svelte';
  import type { ComponentProps } from 'svelte';
  import { VideoPlayerFragment } from './fragments';

  type $$Props = Omit<ComponentProps<VideoPlayer>, 'data'> & {
    data: FragmentOf<typeof VideoPlayerFragment>;
  };

  export let data: $$Props['data'];

  $: unmaskedData = readFragment(VideoPlayerFragment, data);
</script>

<!--
  This component is a wrapper for the <VideoPlayer />` component provided by
  @datocms/svelte, optimized for use with graphql.tada. We define the necessary
  GraphQL fragment for this component to function only once, then reuse it
  wherever needed.
-->

<VideoPlayer {...$$restProps} data={unmaskedData.video} accentColor="var(--color-accent)" />
