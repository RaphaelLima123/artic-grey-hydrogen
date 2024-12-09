import type {HeaderQuery} from 'storefrontapi.generated';

export type HeaderProps = {
  header?: HeaderQuery;
  onCartToggle?: () => void;
};
