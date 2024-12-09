import Like from '~/assets/svgs/like.svg';
import Leaves from '~/assets/svgs/leaves.svg';
import Group from '~/assets/svgs/group.svg';
import List from '~/assets/svgs/list.svg';

const SupplementsOverview = () => {
  const data = [
    {
      id: 1,
      icon: Like,
      title: 'We Make It Easy',
      description:
        'Personalized Solutions & Guidance Mean You Get Just What You Need Nothing More',
    },
    {
      id: 2,
      icon: Leaves,
      title: 'Clean & Effective',
      description:
        'Proven Ingredients, not Artificial, Crafted By Experts For Optimal Effectiveness',
    },
    {
      id: 3,
      icon: Group,
      title: 'Your Free Dietitian',
      description:
        'Every Gainful Subscriber Gets Free, 1:1 Access Their Own Registered Dietitian.',
    },
    {
      id: 4,
      icon: List,
      title: 'Made For You',
      description:
        'Performance is Personal. Personalized & Customizable Products For Your Needs, Body & Goals',
    },
  ];

  return (
    <div className="flex flex-col bg-white gap-2 px-10 py-20">
      <p className="text-base font-normal">🧐 Why Health & Fitness</p>
      <h2 className="text-5xl font-medium mb-10">
        Clean Supplements - <br /> Made For You
      </h2>
      <div className="flex flex-row gap-8">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col gap-4">
            <div className="flex justify-center items-center bg-black rounded-full w-12 h-12">
              <img src={item.icon} alt="icon" />
            </div>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-gray-800/80 text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementsOverview;
