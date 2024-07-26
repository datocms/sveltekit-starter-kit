import { env as privateEnv } from '$env/dynamic/private';
import { isDraftModeEnabled } from '$lib/draftMode.server';
import { executeQuery } from '@datocms/cda-client';
import type { QuerySubscriptionOptions } from '@datocms/svelte';
import type { RequestEvent } from '@sveltejs/kit';
import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';

/**
 * Returns options required to initialize real-time subscriptions to draft content using
 * the `querySubscription` store.
 *
 * Pages and layouts can use this function in their `load` server functions.
 *
 * Read more: https://github.com/datocms/datocms-svelte/tree/main/src/lib/stores/querySubscription
 */
export async function generateRealtimeSubscription<Result, Variables>(
  event: RequestEvent,
  query: TadaDocumentNode<Result, Variables>,
  variables?: Variables,
): Promise<QuerySubscriptionOptions<Result, Variables>> {
  const draftModeEnabled = isDraftModeEnabled(event);

  const data = await executeQuery(query, {
    variables,
    includeDrafts: draftModeEnabled,
    excludeInvalid: true,
    token: draftModeEnabled
      ? privateEnv.PRIVATE_DATOCMS_DRAFT_CONTENT_CDA_TOKEN
      : privateEnv.PRIVATE_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
  });

  // If Draft Mode is not active, there is no need to activate the
  // subscriptions: we simply return the data
  if (!draftModeEnabled) {
    return {
      enabled: false,
      initialData: data,
    };
  }

  // Enable the subscription, passing all the necessary options to the client,
  // including the DatoCMS API token required to execute requests in draft mode
  return {
    enabled: true,
    query: print(query),
    variables,
    initialData: data,
    token: privateEnv.PRIVATE_DATOCMS_DRAFT_CONTENT_CDA_TOKEN,
    includeDrafts: true,
    excludeInvalid: true,
  };
}
