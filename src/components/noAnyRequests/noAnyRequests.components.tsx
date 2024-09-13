import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';

interface NoAnyRequestsProps {
  lang: Locale;
}
function NoAnyRequests({ lang }: NoAnyRequestsProps) {
  const { data } = useGetTextByLangQuery(lang);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2> {data?.page.history.noRequests} </h2>
      <div>
        <Button className="bg-slate-800 hover:bg-slate-600 mr-6">
          <Link href={`${lang}/restfull-client`}>{data?.mainPage.btn.restClient}</Link>
        </Button>
        <Button className="bg-slate-800 hover:bg-slate-600 mr-6">
          <Link href={`${lang}/graphiql-client`}>{data?.mainPage.btn.graphiqlClient}</Link>
        </Button>
      </div>
    </div>
  );
}

export default NoAnyRequests;
