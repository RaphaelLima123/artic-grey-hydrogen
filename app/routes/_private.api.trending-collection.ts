import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import type {ProductEdge} from '@shopify/hydrogen/storefront-api-types';
import {TRENDING_QUERY} from '~/graphql/collections/TrendingQuery';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {
    collection: {
      products: {edges},
    },
  } = await storefront.query(TRENDING_QUERY);

  const products = edges.map((edge: ProductEdge) => edge.node);
  const cursor = edges[edges.length - 1].cursor;

  return {products, cursor};
}
