'use client';

import { Locale } from '../../../i18n.config';
import MainPage from '../../components/mainPage/mainPage.component';

export interface HomeProps {
  params: { lang: Locale };
}

export default function Home({ params: { lang } }: HomeProps) {
  return (
    <main className="min-h-screen bg-gray-300">
      <div>
        <MainPage lang={lang} />
      </div>
    </main>
  );
}
