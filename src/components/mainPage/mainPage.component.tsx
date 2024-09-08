'use client';

import Link from 'next/link';
import { notSignInMainPageProps as MainPageProps } from '../../interfaces/interfaces';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import SignIn from '../signInButton/signIn.component';
import SignUp from '../signUpButton/signUp.component';
import TeamMemberCard from '../teamMemberCard/teamMemberCard.component';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { delay } from '../../utils/functionHelpers';
import { auth } from '../../utils/firebaseConfig';

export default function MainPage({ lang }: MainPageProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const { data } = useGetTextByLangQuery(lang);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      await delay(400);
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <div className="flex justify-center gap-4 pt-3 mb-5">
        {user ? (
          <div>
            <h1 className="flex justify-center font-semibold text-5xl mb-10 mt-5">
              {data?.page.home.greeting},<span role="displayName">{user?.displayName}</span>
            </h1>
            <div className="flex justify-center mt-8">
              <Button className="bg-slate-800 hover:bg-slate-600 mr-6">
                <Link href={`${lang}/restfull-client`}>{data?.mainPage.btn.restClient}</Link>
              </Button>
              <Button className="bg-slate-800 hover:bg-slate-600 mr-6">
                <Link href={`${lang}/graphiql-client`}>{data?.mainPage.btn.graphiqlClient}</Link>
              </Button>
              <Button className="bg-slate-800 hover:bg-slate-600">
                <Link href={`${lang}/history`}>{data?.mainPage.btn.history}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="flex justify-center font-semibold text-5xl mb-10 mt-5">
              {data?.page.home.welcome}
            </h1>
            <div className="flex justify-center">
              <SignUp lang={lang} text={data?.navigation.register || ''} />
              <SignIn lang={lang} text={data?.navigation.logIn || ''} />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-lg text-gray-900 w-4/5 p-7">
          <div className="flex justify-center pt-2 text-2xl">{data?.mainPage.about.project}</div>
          <div className="flex justify-center text-justify pt-3 text-1xl m">
            {data?.mainPage.about.projectText}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-lg text-gray-900 w-4/5 p-7 mt-10">
          <div className="flex justify-center pt-2 text-2xl">{data?.mainPage.about.rss}</div>
          <div className="flex justify-center text-justify pt-3 text-1xl m">
            {data?.mainPage.about.rssText}
          </div>
        </div>
      </div>
      <TeamMemberCard lang={lang} />
    </div>
  );
}
