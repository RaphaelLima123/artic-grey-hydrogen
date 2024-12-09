import {Image} from '@shopify/hydrogen';

import ReviewStarIcon from '~/assets/svgs/reviewStar.svg';
import Bbc from '~/assets/images/bbc-news-logo.png';
import Herb from '~/assets/images/herb-logo.png';
import LaWeekly from '~/assets/images/la-weekly-logo.png';
import Mens from '~/assets/images/mens-journal-logo.png';
import NewYorkTimes from '~/assets/images/new-york-times-logo.png';
import RollingStones from '~/assets/images/rolling-stones-logo.png';

const BrandLogo = ({src, alt}: {src: string; alt: string}) => (
  <div className="flex justify-center items-center rounded-lg bg-white min-w-36 max-h-10">
    <Image
      className="object-cover px-3 py-2"
      src={src}
      alt={alt}
      width="auto"
      height="auto"
      sizes="(max-width: 768px) 30px, 79px"
    />
  </div>
);

const Brands = () => {
  const logos = [
    {id: 'rolling-stones', src: RollingStones, alt: 'Rolling Stones Logo'},
    {id: 'mens', src: Mens, alt: 'Mens Journal Logo'},
    {id: 'la-weekly', src: LaWeekly, alt: 'LA Weekly Logo'},
    {id: 'herb', src: Herb, alt: 'Herb Logo'},
    {id: 'new-york-times', src: NewYorkTimes, alt: 'New York Times Logo'},
    {id: 'bbc', src: Bbc, alt: 'BBC News Logo'},
  ];

  const duplicateLogos = [...logos, ...logos];

  return (
    <div className="flex flex-row items-center py-6 px-10 max-w-full">
      <div className="flex flex-col gap-3 min-w-72">
        <button className="bg-black/10 rounded-lg p-3.5 max-w-48">
          <span className="text-sm font-medium whitespace-nowrap">
            #1 Doctor Recommended
          </span>
        </button>
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-row">
            {Array.from({length: 5}, (_, index) => (
              <img key={index} src={ReviewStarIcon} alt={`star-${index}`} />
            ))}
          </div>
          <p className="text-base text-gray-900 whitespace-nowrap">
            12,000+ 5-star Reviews
          </p>
        </div>
      </div>
      <div className="h-16 w-px bg-gray-900/10 ml-24 mr-20"></div>
      <div className="flex flex-row gap-2 overflow-hidden">
        {duplicateLogos.map((logo, index) => (
          <BrandLogo
            key={`${logo.id}-${index}`}
            src={logo.src}
            alt={logo.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
