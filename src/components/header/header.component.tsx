'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '../../../i18n.config';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher.component';
import Image from 'next/image';
import Logo from '/public/pngwing.com.png';
import SignUp from '../signUpButton/signUp.component';
import SignIn from '../signInButton/signIn.component';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebaseConfig';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import SignOut from '../signOutButton/signOut.component';

interface HeaderProps {
  lang: Locale;
}

function Header({ lang }: HeaderProps) {
  const { data } = useGetTextByLangQuery(lang);
  const [animation, setAnimation] = useState('');

  const [user] = useAuthState(auth);

  useEffect(() => {
    window.addEventListener('scroll', isScroll);
    return () => {
      window.removeEventListener('scroll', isScroll);
    };
  });

  const isScroll = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 50 ? 'animatedHeader' : '';
    setAnimation(stickyClass);
  };

  return (
    <header className={`bg-lime-600 sticky top-0 ${animation}`}>
      <nav className="flex justify-between gap-4 p-4 items-center">
        <div className="flex items-center gap-3">
          <Link href={`/${lang}`}>
            <Image src={Logo} alt="logo" />
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>

        {user ? (
          <SignOut />
        ) : (
          data && (
            <div className="flex gap-4">
              <SignUp lang={lang} text={data?.navigation.register} />
              <SignIn lang={lang} text={data?.navigation.logIn} />
            </div>
          )
        )}
      </nav>
    </header>
  );
}

export default Header;
