<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { NakedImage } from '@datocms/svelte';
  import { ResponsiveImageFragment } from './fragments';

  type $$Props = Omit<ComponentProps<NakedImage>, 'data'> & {
    data: FragmentOf<typeof ResponsiveImageFragment>;
  };

  export let data: $$Props['data'];

  $: unmaskedData = readFragment(ResponsiveImageFragment, data);
</script>

<!--
  This component is a wrapper for the `<NakedImage />` component provided by
  @datocms/svelte, optimized for use with graphql.tada. We define the necessary
  GraphQL fragment for this component to function only once, then reuse it
  wherever needed.
-->

<NakedImage {...$$restProps} data={unmaskedData} />
