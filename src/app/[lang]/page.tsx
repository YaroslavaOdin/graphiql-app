'use client';

import { Locale } from '../../../i18n.config';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  const { data } = useGetTextByLangQuery(lang);

  return (
    <main className="min-h-screen">
      <p>{data?.page.home.title}</p>
    </main>
  );
}
