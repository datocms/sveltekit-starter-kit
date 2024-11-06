<script lang="ts">
  import type { Code } from 'datocms-structured-text-utils';

  interface Props {
    node: Code;
  }

  let { node }: Props = $props();

  function highlight(node: HTMLElement) {
    const run = async () => {
      /*
       * By using import(), we ensure that a separate chunk is generated for
       * this heavy library, so that it is only requested when the component is
       * actually rendered on the page..
       */
      const { default: hljs } = await import('highlight.js');
      hljs.highlightElement(node);
    };

    run();
  }
</script>

<pre class={`language-${node.language}`}><code use:highlight>{node.code}</code></pre>
