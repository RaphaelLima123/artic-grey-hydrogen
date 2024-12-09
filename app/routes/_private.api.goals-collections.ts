import {type LoaderFunctionArgs} from '@remix-run/server-runtime';
import type {CollectionEdge} from '@shopify/hydrogen/storefront-api-types';
import {GOALS_COLLECTIONS_QUERY} from '~/graphql/collections/GoalsCollectionsQuery';

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {collections} = await storefront.query(GOALS_COLLECTIONS_QUERY);

  const nodes = collections.edges.map((edge: CollectionEdge) => edge.node);

  return nodes;
}
