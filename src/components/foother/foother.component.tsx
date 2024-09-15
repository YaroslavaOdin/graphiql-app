'use client';

import Link from 'next/link';
import RSSLogo from '../../../public/rss-logo.svg';
import Image from 'next/image';
import GitHubLogo from '../../../public/github-logo.png';
import { FootherProps, IGithubLink } from '../../interfaces/interfaces';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

export default function Foother({ lang }: FootherProps): JSX.Element {
  const { data } = useGetTextByLangQuery(lang) || '';

  const githubLinks: IGithubLink[] = [
    {
      name: data?.foother.names.alexander || 'Aleksandr',
      link: 'https://github.com/Alex991995',
    },
    {
      name: data?.foother.names.nikolai || 'Nikolai',
      link: 'https://github.com/kaliganoff',
    },
    {
      name: data?.foother.names.yaraslava || 'Yaraslava',
      link: 'https://github.com/YaroslavaOdin',
    },
  ];

  const rssLink = 'https://rs.school/courses/reactjs';
  const creationYear = '2024';

  return (
    <footer className="h-12 p-3 bg-gray-900">
      <div className="flex items-stretch">
        <div className="flex grow">
          <Link className="text-gray-50 w-full relative" href={rssLink}>
            <Image
              className="mr-2 !w-6 !h-6 !relative border-gray-50"
              src={RSSLogo}
              alt="rss-logo"
              fill
            ></Image>
          </Link>
        </div>

        <div className="flex items-center grow">
          {githubLinks.map((personGuthubLink: IGithubLink, index: number) => (
            <div key={index}>
              <div className="mr-5">
                <Link
                  className="w-full flex text-gray-300 hover:text-gray-50 relative"
                  href={personGuthubLink.link}
                >
                  <Image
                    className="mr-2 !w-6 !h-6 !relative"
                    src={GitHubLogo}
                    alt="github-logo"
                    fill
                    sizes="(max-width: 1.5rem)"
                  />
                  <p>{personGuthubLink.name}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400">{creationYear}</div>
      </div>
    </footer>
  );
}
