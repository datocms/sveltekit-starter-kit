import { ApiError } from '@datocms/cma-client';
import { json } from '@sveltejs/kit';
import { serializeError } from 'serialize-error';

export function withCORS(responseInit?: ResponseInit): ResponseInit {
  return {
    ...responseInit,
    headers: {
      ...responseInit?.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  };
}

export function handleUnexpectedError(error: unknown) {
  try {
    throw error;
  } catch (e) {
    console.error(e);
  }

  if (error instanceof ApiError) {
    return json(
      {
        success: false,
        error: error.message,
        request: error.request,
        response: error.response,
      },
      withCORS({ status: 500 }),
    );
  }

  return invalidRequestResponse(serializeError(error), 500);
}

export function invalidRequestResponse(error: unknown, status = 422) {
  return json(
    {
      success: false,
      error,
    },
    withCORS({ status }),
  );
}

export function successfulResponse(data?: unknown, status = 200) {
  return json(
    {
      success: true,
      data,
    },
    withCORS({ status }),
  );
}

/**
 * Determine whether a user-supplied redirect target is safe to follow — i.e. it
 * points to the same host as the current request.
 *
 * This guards against open-redirect attacks. A naive `url.startsWith('http')`
 * check — and even a plain "is it a relative URL?" check — fails to catch
 * protocol-relative targets like `//evil.com` or backslash variants like
 * `/\evil.com`, both of which browsers happily send off-site.
 *
 * Instead, we resolve the candidate against the current request URL and require
 * the resulting hostname to match. Relative paths (`/foo`, `/a?b=1#c`) resolve
 * to the same host and pass; anything that escapes to another host — or fails to
 * parse — is rejected. The scheme is irrelevant: we only compare hostnames.
 */
export function isSafeRedirectUrl(candidate: string, requestUrl: URL): boolean {
  try {
    const target = new URL(candidate, requestUrl);
    return target.hostname === requestUrl.hostname;
  } catch {
    return false;
  }
}
