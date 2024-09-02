'use client';
import { Locale } from '../../../i18n.config';
import { auth } from '../../utils/firebaseConfig';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { delay } from '../../utils/functionHelpers';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';

export interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  const { data } = useGetTextByLangQuery(lang);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      await delay(400);
      setUser(user);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <main>
      <p>
        {data?.page.home.greeting} <span role="displayName">{user?.displayName}</span>
      </p>
      <Button onClick={() => router.push('/')}>{data?.page.home.nameOfPage}</Button>
    </main>
  );
}
