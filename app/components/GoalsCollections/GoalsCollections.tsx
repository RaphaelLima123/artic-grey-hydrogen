import {useFetcher} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useState} from 'react';
import DiagonalArrow from '~/assets/svgs/diagonal-arrow.svg';

const GoalsCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const {load, data} = useFetcher({key: 'goals-collections'});

  useEffect(() => {
    load('/api/goals-collections');
  }, [load]);

  useEffect(() => {
    const typedData = data as Collection[];

    if (typedData) {
      setCollections(typedData);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center bg-white items-center gap-10  pt-20 px-10 pb-14">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className="text-base font-normal">COMFORTABLY UNCOMFORTABLE</h3>
        <h2 className="font-medium text-4xl text-gray-900">
          Start with your Goals
        </h2>
        <p className="text-gray-900 opacity-70 text-center mt-2">
          We cannot become what we want to be by <br />
          remaining what we are.
        </p>
      </div>
      <div className="flex flex-row items-start gap-5">
        {collections.map((collection: Collection) => (
          <a
            key={collection.id}
            className="flex flex-col gap-6 max-w-[288px] cursor-pointer transition-opacity duration-400 hover:opacity-80"
            href={collection.handle ? `/collections/${collection.handle}` : '/'}
          >
            <Image
              className="rounded-lg w-full min-h-[392px] min-w-full object-cover"
              src={collection.image?.url}
              alt={collection.title}
              width={288}
              height={392}
            />
            <div className="flex flex-row justify-between items-baseline">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{collection.title}</h3>
                <p className="text-gray-800/80 font-normal text-base">
                  {collection.description}
                </p>
              </div>
              <div className="flex items-center justify-center min-w-[37px] min-h-[37px] rounded-full border-1 border-black">
                <img src={DiagonalArrow} alt="Diadgonal arrow" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GoalsCollections;
