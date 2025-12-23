<script lang="ts">
  import { createController } from '@datocms/content-link';
  import { onDestroy, onMount } from 'svelte';
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
   * - Notifying the plugin when the URL changes via `setCurrentPath`
   *
   * This integration is completely automatic when running inside the plugin's iframe,
   * with graceful fallback to opening edit URLs in a new tab when running standalone.
   *
   * @see https://www.npmjs.com/package/@datocms/content-link
   * @see https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews
   */

  let controller: ReturnType<typeof createController> | null = null;

  onMount(() => {
    // Initialize the content-link controller
    controller = createController({
      // Handle navigation requests from the Web Previews plugin
      // Inside Visual mode, users can navigate to different URLs (like a browser bar)
      // and the plugin will request the preview to navigate accordingly
      onNavigateTo: (path: string) => {
        goto(path);
      },
    });

    // Click-to-edit overlays are not enabled by default. Instead, editors can:
    // - Press and hold Alt/Option key to temporarily enable click-to-edit mode
    // - Release the key to disable it again
    //
    // If you prefer to enable click-to-edit programmatically, uncomment:
    // controller.enableClickToEdit({
    //   scrollToNearestTarget: true, // Scroll to nearest editable if none visible
    // });
  });

  // Notify the Web Previews plugin when the URL changes
  // This keeps the plugin in sync with the current page being previewed
  $effect(() => {
    controller?.setCurrentPath($page.url.pathname);
  });

  onDestroy(() => {
    controller?.dispose();
    controller = null;
  });
</script>
