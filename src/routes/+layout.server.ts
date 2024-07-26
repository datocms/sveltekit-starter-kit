import { TagFragment } from '$lib/datocms/commonFragments';
import { graphql } from '$lib/datocms/graphql';
import { generateRealtimeSubscription } from '$lib/datocms/queries';
import type { LayoutServerLoad } from './$types';

const query = graphql(
  /* GraphQL */ `
    query RootQuery {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

export const load: LayoutServerLoad = async (event) => {
  const subscription = await generateRealtimeSubscription(event, query);

  return { subscription };
};
