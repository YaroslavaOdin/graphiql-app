import React from 'react';
import { Button } from '../ui/button';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import { redirectToRightRoute } from '../../utils/functionHelpers';
import { usePathname, useRouter } from 'next/navigation';

interface NoAnyRequestsProps {
  lang: Locale;
}
function NoAnyRequests({ lang }: NoAnyRequestsProps) {
  const { data } = useGetTextByLangQuery(lang);

  const pathname = usePathname();
  const arrayPathname = pathname.split('/');
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4">
      <h2> {data?.page.history.noRequests} </h2>
      <div>
        <Button
          className="bg-slate-800 hover:bg-slate-600 mr-6"
          onClick={() => redirectToRightRoute(arrayPathname, `${lang}/restfull-client`, router)}
        >
          {data?.mainPage.btn.restClient}
        </Button>

        <Button
          className="bg-slate-800 hover:bg-slate-600 mr-6"
          onClick={() => redirectToRightRoute(arrayPathname, `${lang}/graphiql-client`, router)}
        >
          {data?.mainPage.btn.graphiqlClient}
        </Button>
      </div>
    </div>
  );
}

export default NoAnyRequests;
