import { disableDraftMode } from '$lib/draftMode.server';
import { redirect } from '@sveltejs/kit';
import { handleUnexpectedError, invalidRequestResponse } from '../../utils';
import type { RequestHandler } from './$types';

/**
 * This route handler disables Draft Mode and redirects to the given URL.
 */
export const GET: RequestHandler = (event) => {
  const { url } = event;
  // Parse query string parameters
  const redirectUrl = url.searchParams.get('url') || '/';

  try {
    // Avoid open redirect vulnerabilities
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    disableDraftMode(event);
  } catch (error) {
    return handleUnexpectedError(error);
  }

  redirect(307, redirectUrl);
};
