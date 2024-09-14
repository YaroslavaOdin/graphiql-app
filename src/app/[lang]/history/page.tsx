import dynamic from 'next/dynamic';
import ComponentForCheckAuth from '../../../components/componentForCheckAuth/componentForCheckAuth.component';
import { Locale } from '../../../../i18n.config';
import { getDictionary } from '../../../lib/dictionary';
const Requests = dynamic(() => import('../../../components/requests/requests.component'), {
  ssr: false,
});

export interface HistoryPageProps {
  params: { lang: Locale };
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const data = await getDictionary(params.lang);

  return (
    <section className="container flex flex-col items-center justify-center">
      <h2>{data.page.history.title} </h2>
      <Requests />
      <ComponentForCheckAuth />
    </section>
  );
}
