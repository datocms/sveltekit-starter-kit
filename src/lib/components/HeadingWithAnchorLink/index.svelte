<script lang="ts">
  import { render as structuredTextToPlainText } from 'datocms-structured-text-to-plain-text';
  import type { Heading } from 'datocms-structured-text-utils';

  // https://www.datocms.com/docs/structured-text/dast#heading
  export let node: Heading;

  /**
   * Returns a slugified version of the string by converting the input to
   * lowercase, eliminating non-alphanumeric characters, and removing any hyphens
   * at the beginning or end of the string.
   */
  const slugify = (str: string | null) =>
    str
      ? str
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : undefined;

  $: as = `h${node.level}` as const;

  // Convert the node to plain text, and then slugify
  $: slug = slugify(structuredTextToPlainText(node));
</script>

<!--
  Renders a Structured Text heading node as an heading with anchor link.
-->

{#if slug}
  <svelte:element this={as} id={slug} tabindex="-1">
    <a href={`#${slug}`}>
      <slot />
    </a>
  </svelte:element>
{:else}
  <svelte:element this={as}>
    <slot />
  </svelte:element>
{/if}
