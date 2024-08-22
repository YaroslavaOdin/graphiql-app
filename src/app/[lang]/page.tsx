import { getDictionary } from '../../lib/dictionary';
import { Locale } from '../../../i18n.config';

interface HomeProps {
  params: { lang: Locale }
} 

export default async function Home({params: { lang }}:HomeProps) {
  console.log(process.env.API_KEY)
  const { page } = await getDictionary(lang)
  return (
    <main >
      <p>{page.home.title}</p>
    </main>
  );
}
