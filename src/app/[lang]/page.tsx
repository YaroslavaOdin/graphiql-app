'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Locale } from '../../../i18n.config';
import { auth } from '../../utils/firebaseConfig';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  const [user] = useAuthState(auth);
  const { data } = useGetTextByLangQuery(lang);

  return (
    <main>=
      <p>{user?.displayName}</p>
      <p>{data?.page.home.title}</p>
    </main>
  );
}
