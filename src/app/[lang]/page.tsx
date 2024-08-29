'use client';

import { Locale } from '../../../i18n.config';
import { auth } from '../../utils/firebaseConfig';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { delay } from '../../utils/functionHelpers';

interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  const { data } = useGetTextByLangQuery(lang);
  const [user, setUser] = useState<User | null>(null);
  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      await delay(400);
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <main>
      <p>{user?.displayName}</p>
      <p>{data?.page.home.title}</p>
    </main>
  );
}
