import type {Product} from '@shopify/hydrogen/storefront-api-types';

export type TrendingAPIResponse = {
  products: Product[];
  cursor: string;
};
