import { disableDraftMode } from '$lib/draftMode.server';
import { redirect } from '@sveltejs/kit';
import { handleUnexpectedError, invalidRequestResponse, isRelativeUrl } from '../../utils';
import type { RequestHandler } from './$types';

/**
 * This route handler disables Draft Mode and redirects to the given URL.
 */
export const GET: RequestHandler = (event) => {
  const { url } = event;
  // Parse query string parameters
  const redirectUrl = url.searchParams.get('redirect') || '/';

  try {
    // Avoid open redirect vulnerabilities
    if (!isRelativeUrl(redirectUrl)) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    disableDraftMode(event);
  } catch (error) {
    return handleUnexpectedError(error);
  }

  redirect(307, redirectUrl);
};
