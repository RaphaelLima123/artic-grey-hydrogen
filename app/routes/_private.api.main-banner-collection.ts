import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {MAIN_BANNER_COLLECTION_QUERY} from '~/graphql/collections/MainBannerCollectionQuery';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {
    collection: {
      handle,
      image: {url},
    },
  } = await storefront.query(MAIN_BANNER_COLLECTION_QUERY);

  return {handle, url};
}
