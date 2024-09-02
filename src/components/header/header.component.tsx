'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDictionary } from '../../lib/dictionary';
import { Locale } from '../../../i18n.config';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher.component';
import Image from 'next/image';
import Logo from '/public/pngwing.com.png';
import SignUp from '../signUpButton/signUp.component';
import SignIn from '../signInButton/signIn.component';
import { DictionaryType } from '../../interfaces/interfaces';

interface HeaderProps {
  lang: Locale;
}

function Header({ lang }: HeaderProps) {
  const [dictionary, setDictionary] = useState<DictionaryType | undefined>(undefined);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    getDictionary(lang).then(res => setDictionary(res));
  }, [lang]);

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
    <header className={`bg-lime-600 sticky top-0 ${animation} z-50`}>
      <nav className="flex justify-between gap-4 p-4 items-center">
        <div className="flex items-center gap-3">
          <Link href={`/${lang}`}>
            <Image src={Logo} alt="logo" />
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>
        {dictionary && (
          <div className="flex gap-4">
            <SignUp lang={lang} text={dictionary.navigation.register} />
            <SignIn lang={lang} text={dictionary.navigation.logIn} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
