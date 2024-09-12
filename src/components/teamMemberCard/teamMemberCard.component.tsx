'use client';

import { ITeamMemberCard, TeamMemberProps } from '../../interfaces/interfaces';
import Image from 'next/image';
import NaturePicture from '../../../public/nature.jpg';
import Cat from '../../../public/cat.jpg';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

export default function TeamMemberCard({ lang }: TeamMemberProps): JSX.Element {
  const { data } = useGetTextByLangQuery(lang);

  const TeamMemberInfo: ITeamMemberCard[] = [
    {
      name: data?.mainPage.teamMember.names.alexander || '',
      specialization: data?.mainPage.teamMember.specialization.engineer || '',
      photo: Cat,
    },
    {
      name: data?.mainPage.teamMember.names.nikolai || '',
      specialization: data?.mainPage.teamMember.specialization.engineer || '',
      photo: Cat,
    },
    {
      name: data?.mainPage.teamMember.names.yaraslava || '',
      specialization: data?.mainPage.teamMember.specialization.leadEngineer || '',
      photo: Cat,
    },
  ];

  return (
    <div>
      <h2 className="flex justify-center font-semibold text-3xl pt-10">{data?.page.home.team}</h2>
      <div className="px-5 pb-24 mx-auto flex flex-wrap">
        {TeamMemberInfo.map((TeamMember: ITeamMemberCard, index: number) => (
          <div
            key={index}
            className="m-1 max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900"
          >
            <div className="rounded-t-lg h-32 overflow-hidden">
              <Image
                className="object-cover object-top w-full"
                src={NaturePicture}
                alt="Mountain"
              ></Image>
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <Image
                className="object-cover object-center h-32"
                src={TeamMember.photo}
                alt="Member photo"
              ></Image>
            </div>
            <div className="text-center mt-2 pb-5">
              <h3 className="font-semibold">{TeamMember.name}</h3>
              <p className="text-gray-500">{TeamMember.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}