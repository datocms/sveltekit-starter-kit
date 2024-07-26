import { graphql } from '$lib/datocms/graphql';
import { ImageBlockFragment } from './ImageBlock/fragments';
import { ImageGalleryBlockFragment } from './ImageGalleryBlock/fragments';
import { VideoBlockFragment } from './VideoBlock/fragments';

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */

export const BlockFragment = graphql(
  /* GraphQL */ `
    fragment BlockFragment on PageModelStructuredTextBlocksField {
      ... on RecordInterface {
        id
        __typename
      }
      ... on ImageBlockRecord {
        ...ImageBlockFragment
      }
      ... on ImageGalleryBlockRecord {
        ...ImageGalleryBlockFragment
      }
      ... on VideoBlockRecord {
        ...VideoBlockFragment
      }
    }
  `,
  [ImageBlockFragment, ImageGalleryBlockFragment, VideoBlockFragment],
);
