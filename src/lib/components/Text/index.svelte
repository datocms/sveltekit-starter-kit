<script lang="ts">
  import {
    StructuredText as DatoStructuredText,
    type PredicateComponentTuple,
  } from '@datocms/svelte';
  import { isCode, isHeading } from 'datocms-structured-text-utils';
  import type { ComponentProps } from 'svelte';
  import Code from '$lib/components/Code/index.svelte';
  import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';

  /**
   * Project-wide wrapper around `<StructuredText />` from `@datocms/svelte`,
   * exposed as `<Text />` to distinguish it from the upstream component.
   *
   * Always render structured text through this component instead of
   * importing `@datocms/svelte` directly. Two reasons:
   *
   * 1. Every render needs `data-datocms-content-link-group` around it for
   *    Visual Editing to resolve clickable areas correctly. Centralizing
   *    the wrapper means no page can forget it.
   *
   * 2. Project-wide concerns — default node-override components for
   *    headings and code blocks — are baked in here, so every
   *    structured-text field renders consistently without each caller
   *    restating them.
   *
   * Props are typed by borrowing from the upstream component, so this
   * wrapper transparently accepts everything `<StructuredText />` does
   * without maintaining a parallel prop list. Caller-supplied `components`
   * are *prepended* before the project defaults: in `components` earlier
   * predicate-component tuples win the match, so caller entries must come
   * first to give them precedence and let callers opt out of any default.
   */

  type Props = ComponentProps<DatoStructuredText>;

  let { components = [], ...rest }: Props = $props();

  const defaultComponents: PredicateComponentTuple[] = [
    [isCode, Code],
    [isHeading, HeadingWithAnchorLink],
  ];

  let mergedComponents = $derived([...components, ...defaultComponents]);
</script>

<div data-datocms-content-link-group>
  <DatoStructuredText {...rest} components={mergedComponents} />
</div>
