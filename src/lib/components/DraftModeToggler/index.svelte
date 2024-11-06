<script lang="ts">
  import { env as publicEnv } from '$env/dynamic/public';
  import { onMount } from 'svelte';

  let isDraftModeEnabled = $state(false);

  onMount(() => {
    // See: https://developer.mozilla.org/en-US/docs/web/api/document/cookie#example_2_get_a_sample_cookie_named_test2
    const cookie = document.cookie
      .split(/\s*;\s*/)
      .find((row) => row.startsWith(`${publicEnv.PUBLIC_DRAFT_MODE_COOKIE_NAME}=`))
      ?.split('=')[1];

    isDraftModeEnabled = !!cookie;
  });

  async function handleClick() {
    let response: Response;

    if (isDraftModeEnabled) {
      response = await fetch('/api/draft-mode/disable');
    } else {
      const token = prompt(
        'To enter Draft Mode, you need to insert the PRIVATE_SECRET_API_TOKEN:',
        'secretTokenProtectingWebhookEndpointsFromBeingCalledByAnyone',
      );
      if (!token) {
        return;
      }

      response = await fetch(`/api/draft-mode/enable?token=${token}`);
    }

    if (!response.ok) {
      alert('Could not complete the operation!');
      return;
    }

    document.location.reload();
  }
</script>

{#if isDraftModeEnabled}
  <button type="button" onclick={handleClick}>Disable Draft Mode</button>
{:else}
  <button type="button" onclick={handleClick}>Enable Draft Mode</button>
{/if}
