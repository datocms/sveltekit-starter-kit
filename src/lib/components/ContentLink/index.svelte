<script lang="ts">
  import { ContentLink } from '@datocms/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  /**
   * ContentLink component enables click-to-edit overlays for DatoCMS content.
   *
   * This component provides two powerful editing experiences:
   *
   * 1. **Standalone website editing**: When viewing your draft content on the website,
   *    editors can click on any content element to open the DatoCMS editor and modify
   *    that specific field. This works by detecting stega-encoded metadata in the content
   *    and creating interactive overlays.
   *
   * 2. **Web Previews plugin integration**: When your preview runs inside the Visual Editing
   *    mode of the DatoCMS Web Previews plugin, this component automatically establishes
   *    bidirectional communication with the plugin. This enables:
   *    - Clicking content to instantly open the correct field in the side panel
   *    - In-plugin navigation: users can navigate to different URLs within Visual mode
   *      (like a browser navigation bar), and the preview updates accordingly
   *    - Synchronized state between the preview and the DatoCMS interface
   *
   * The component handles client-side routing by:
   * - Listening to navigation requests from the Web Previews plugin via `onNavigateTo`
   * - Notifying the plugin when the URL changes via `currentPath`
   *
   * This integration is completely automatic when running inside the plugin's iframe,
   * with graceful fallback to opening edit URLs in a new tab when running standalone.
   *
   * For more complex UI requirements (e.g., a toolbar to toggle click-to-edit mode),
   * you can use the `createController` function from the `@datocms/content-link` package
   * directly. This gives you full control over the controller lifecycle and methods like
   * `enableClickToEdit()`, `disableClickToEdit()`, `isClickToEditEnabled()`, and `flashAll()`.
   *
   * @see https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews
   * @see https://www.npmjs.com/package/@datocms/content-link
   */
</script>

<ContentLink
  onNavigateTo={(path) => goto(path)}
  currentPath={$page.url.pathname}
  enableClickToEdit={{ hoverOnly: true }}
/>
