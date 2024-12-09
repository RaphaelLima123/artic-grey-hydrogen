import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useRouteLoaderData, type MetaFunction} from '@remix-run/react';
import {
  Brands,
  Cart,
  GoalsCollections,
  Header,
  MainBanner,
  SupplementsOverview,
  Trending,
} from '~/components';
import type {RootLoader} from '~/root';

export const meta: MetaFunction = () => {
  return [{title: 'Raphael | Test'}];
};

export async function loader(args: LoaderFunctionArgs) {
  return null;
}

const Homepage = () => {
  const rootData = useRouteLoaderData<RootLoader>('root');

  return (
    <div className="flex flex-col w-full bg-[#f6f6f5]">
      <MainBanner collectionName="hydrogen" />
      <Brands />
      <GoalsCollections />
      <Trending />
      <SupplementsOverview />
    </div>
  );
};

export default Homepage;
