'use client';

import { Locale } from '../../../i18n.config';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  const { data } = useGetTextByLangQuery(lang);

  return (
    <main>
      <p>{data?.page.home.title}</p>
    </main>
  );
}
