'use client';
import { useSignOut } from 'react-firebase-hooks/auth';

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
  const [out] = useSignOut(auth);
  const { data } = useGetTextByLangQuery(lang);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      await delay(300);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  function f() {
    out();
  }

  return (
    <main>
      <p>{user?.displayName}</p>
      <p>{data?.page.home.title}</p>
      <button onClick={f}>button</button>
    </main>
  );
}
