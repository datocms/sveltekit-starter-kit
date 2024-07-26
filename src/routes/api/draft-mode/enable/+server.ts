import { env } from '$env/dynamic/private';
import { enableDraftMode } from '$lib/draftMode.server';
import { redirect } from '@sveltejs/kit';
import { handleUnexpectedError, invalidRequestResponse } from '../../utils';
import type { RequestHandler } from './$types';

/**
 * This route handler enables Draft Mode and redirects to the given URL.
 */
export const GET: RequestHandler = (event) => {
  const { url } = event;

  // Parse query string parameters
  const token = url.searchParams.get('token');
  const redirectUrl = url.searchParams.get('url') || '/';

  try {
    // Ensure that the request is coming from a trusted source
    if (token !== env.PRIVATE_SECRET_API_TOKEN) {
      return invalidRequestResponse('Invalid token', 401);
    }

    // Avoid open redirect vulnerabilities
    if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
      return invalidRequestResponse('URL must be relative!', 422);
    }

    enableDraftMode(event);
  } catch (error) {
    return handleUnexpectedError(error);
  }

  redirect(307, redirectUrl);
};
