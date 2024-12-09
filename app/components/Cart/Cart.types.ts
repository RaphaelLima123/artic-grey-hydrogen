import type {CartReturn} from '@shopify/hydrogen';

export type CartProps = {
  cart?: Promise<CartReturn | null> | CartReturn | null;
  cartOpened?: boolean;
  onToggle?: () => void;
};
