/*
 * Type-safe record handling using DatoCMS's generated types.
 *
 * This file uses types generated from your DatoCMS schema via `npm run generate-cma-types`.
 * The generated types provide full autocomplete and compile-time safety when
 * accessing record fields.
 *
 * See: https://www.datocms.com/docs/content-management-api/resources/item#type-safe-development-with-typescript
 */
import type { RawApiTypes } from '@datocms/cma-client';
import type { AnyModel } from './cma-types';

/*
 * Both the "Web Previews" and "SEO/Readability Analysis" plugins from DatoCMS
 * need to know the URL of the site that corresponds to each DatoCMS record to
 * work properly. These two functions are responsible for returning this
 * information, and are utilized by the API routes associated with the two
 * plugins:
 *
 * - src/routes/api/seo-analysis/+server.ts
 * - src/routes/api/preview-links/+server.ts
 */

export function recordToWebsiteRoute(
  item: RawApiTypes.Item<AnyModel>,
  itemTypeId: string,
  _locale: string,
): string | null {
  switch (itemTypeId) {
    // Page model
    case 'JdG722SGTSG_jEB1Jx-0XA': {
      return '/';
    }
    /*
     * Add more cases here as you add more models to your DatoCMS schema.
     * Use the model ID (not api_key) for type-safe narrowing.
     * Example for an article model:
     *
     * case 'ARTICLE_MODEL_ID': {
     *   return `/blog/${recordToSlug(item, itemTypeId, locale)}`;
     * }
     */
    default:
      return null;
  }
}

export function recordToSlug(
  item: RawApiTypes.Item<AnyModel>,
  itemTypeId: string,
  _locale: string,
): string | null {
  switch (itemTypeId) {
    // Page model
    case 'JdG722SGTSG_jEB1Jx-0XA': {
      /*
       * Using generated types, TypeScript knows exactly which fields exist.
       * `item.attributes.title` is fully typed - no casts needed!
       */
      return item.attributes.title;
    }
    /*
     * Add more cases here as you add more models to your DatoCMS schema.
     * Example for an article model with a slug field:
     *
     * case 'ARTICLE_MODEL_ID': {
     *   return item.attributes.slug;
     * }
     */
    default:
      return null;
  }
}
