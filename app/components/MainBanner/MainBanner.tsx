import {useFetcher} from '@remix-run/react';
import type {MainBannerLoaderData, MainBannerProps} from './MainBanner.types';
import {useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import Highlights from '../Highlights';

const MainBanner = ({collectionName}: MainBannerProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [handle, setHandle] = useState<string | undefined>();
  const {load, data} = useFetcher({key: collectionName});

  useEffect(() => {
    load('/api/main-banner-collection');
  }, [load]);

  useEffect(() => {
    const typedData = data as MainBannerLoaderData;
    if (typedData) {
      setHandle(typedData.handle);
      setImageUrl(typedData.url);
    }
  }, [data]);

  return (
    <div className="relative">
      <Image
        className="w-full max-h-[920px] object-cover"
        src={imageUrl}
        loading="lazy"
        width="auto"
        height="920px"
        alt="Main Banner"
        sizes="(max-width: 768px) 100vw, 920px"
      />
      <div className="absolute flex flex-col items-start gap-10 bottom-40 left-10">
        <span className="text-white font-semibold	text-7xl w-8/12">
          Great things never came from comfort zones.
        </span>
        <a
          href={handle ? `/collections/${handle}` : '/'}
          className="bg-white text-black py-3.5 px-10 rounded-lg font-medium text-base"
        >
          Shop Now
        </a>
      </div>
      <Highlights />
    </div>
  );
};

export default MainBanner;
