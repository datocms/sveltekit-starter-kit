import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { RequestEvent } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) that is used as a signed cookie for entering
 * Draft Mode.
 */
function jwtToken() {
  return jwt.sign({ enabled: true }, env.PRIVATE_SIGNED_COOKIE_JWT_SECRET);
}

/**
 * To be used on API routes: sets the signed cookie required to enter Draft
 * Mode.
 */
export function enableDraftMode(event: RequestEvent) {
  event.cookies.set(publicEnv.PUBLIC_DRAFT_MODE_COOKIE_NAME, jwtToken(), {
    path: '/',
    partitioned: true,
    sameSite: 'none',
    httpOnly: false,
  });
}

/**
 * To be used on API routes: disables Draft Mode by deleting the cookie.
 */
export function disableDraftMode(event: RequestEvent) {
  event.cookies.delete(publicEnv.PUBLIC_DRAFT_MODE_COOKIE_NAME, {
    path: '/',
    partitioned: true,
    sameSite: 'none',
    httpOnly: false,
  });
}

/**
 * To be used on API routes: checks if Draft Mode is enabled for a given
 * request. It retrieves the cookie and verifies its JWT token.
 */
export function isDraftModeEnabled(event: RequestEvent) {
  const cookie = event.cookies.get(publicEnv.PUBLIC_DRAFT_MODE_COOKIE_NAME);

  if (!cookie) {
    return false;
  }

  try {
    const payload = jwt.verify(cookie, env.PRIVATE_SIGNED_COOKIE_JWT_SECRET) as JwtPayload;

    return payload.enabled as boolean;
  } catch (e) {
    return false;
  }
}

/**
 * Returns the HTTP headers needed to enable Draft Mode.
 */
export function draftModeHeaders(): HeadersInit {
  return {
    Cookie: `${publicEnv.PUBLIC_DRAFT_MODE_COOKIE_NAME}=${jwtToken()};`,
  };
}
