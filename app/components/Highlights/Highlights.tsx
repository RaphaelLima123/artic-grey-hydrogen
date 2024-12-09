import StarIcon from '~/assets/svgs/star.svg';

const Highlights = () => {
  const items = [
    'High Quality Ingredients',
    'Independently Certified',
    'Expert Driven',
    'Shipped Internationally',
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden bg-black py-4">
      <div className="animate-highlights-scroll flex gap-8">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex flex-row text-white items-center whitespace-nowrap gap-4"
          >
            <img src={StarIcon} alt="Star Icon" className="w-6 h-6" />
            <span className="text-sm font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlights;
