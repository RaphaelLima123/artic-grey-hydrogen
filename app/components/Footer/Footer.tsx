import HeartIcon from '~/assets/svgs/black-heart.svg';
import CoffeIcon from '~/assets/svgs/black-coffe.svg';
import type {FooterProps} from './Footer.types';
import {useEffect, useState} from 'react';
import type {FooterQuery} from 'storefrontapi.generated';
import Youtube from '~/assets/svgs/youtube.svg';
import Facebook from '~/assets/svgs/facebook.svg';
import Twitter from '~/assets/svgs/twitter.svg';
import Instagram from '~/assets/svgs/instagram.svg';

const Footer = ({footer}: FooterProps) => {
  const [footerData, setFooterData] = useState<FooterQuery>();

  useEffect(() => {
    async function resolveFooter() {
      if (footer) {
        const data = await footer;
        setFooterData(data);
      }
    }

    resolveFooter();
  }, [footer]);

  const socialMedia = [
    {
      name: 'Instagram',
      icon: Instagram,
      link: 'https://www.instagram.com/uncmfrt/',
    },
    {name: 'Twitter', icon: Twitter, link: 'https://twitter.com/uncmfrt'},
    {
      name: 'Facebook',
      icon: Facebook,
      link: 'https://www.facebook.com/uncmfrt',
    },
    {
      name: 'Youtube',
      icon: Youtube,
      link: 'https://www.youtube.com/channel/UC9J6F1J7Z',
    },
  ];

  return (
    <footer className="flex flex-col w-full pt-20">
      <div className="flex flex-row justify-between mb-20 px-10">
        <div className="flex flex-col max-w-[398px] gap-4">
          <span className="font-semibold text-2xl">
            Be a Part of Our Journey
          </span>
          <p className="font-normal text-base text-gray-900 text-opacity-80 mb-4">
            Welcome to UNCMFRT. Sign up for exclusive content and we&apos;ll
            send you 10% off.
          </p>
          <div>
            <form>
              <input
                type="email"
                placeholder="Email Address"
                className="border-1 border-gray-300 py-3 px-5 rounded-l-lg text-black text-sm placeholder-black "
              />
              <button className="bg-black text-white py-3 px-5 rounded-r-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-14">
          {footerData?.menu?.items.map((item) => (
            <div className="flex flex-col gap-3.5" key={item.title}>
              <span className="font-semibold text-lg mb-2">{item.title}</span>
              {item.items.map((subItem) => (
                <a
                  key={subItem.title}
                  href={subItem.url ?? '#'}
                  className="font-normal text-base text-gray-900 text-opacity-80"
                >
                  {subItem.title}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg mb-4">Contact Us</span>
          <p className="font-normal text-base text-gray-900 text-opacity-80">
            Let Us Help You
          </p>
          <span className="font-bold text-2xl mb-6">(888)860-0572</span>
          <p className="font-medium text-lg">Connect With Us</p>
          <div className="flex flex-row mt-4 gap-6 items-center">
            {socialMedia.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between font-light text-sm py-4 text-gray-900 border-t-1 border-gray-200 px-10">
        <p>© Artic Grey. All rights reserved.</p>
        <div className="flex flex-row items-center gap-1">
          <p>Made with</p>
          <img src={HeartIcon} alt="Heart Icon" />
          <p>and</p>
          <img src={CoffeIcon} alt="Coffee Icon" />
          <p>by Raphael Lima</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
