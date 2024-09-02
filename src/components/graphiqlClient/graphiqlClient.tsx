'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useParams, useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import prettify from '../../utils/prettify';

export default function GraphiQLClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const [endpointState, setEndpointState] = useState<string>('');
  const [queryState, setQueryState] = useState<string>('');
  const router = useRouter();
  const { lang, endpoint, query }: { lang: Locale; endpoint: string; query: string } = useParams();

  const { data } = useGetTextByLangQuery(lang);

  useEffect(() => {
    if (endpoint && query) {
      setEndpointState(nextBase64.decode(endpoint));
      setQueryState(nextBase64.decode(query));
    }
  }, [endpoint, query]);

  function HandleSendRequest() {
    router.push(
      `/en/graphiql-client/GRAPHQL/${nextBase64.encode(endpointState).split('=').join('')}/${nextBase64.encode(queryState).split('=').join('')}`,
    );
  }

  function HandlePrettify() {
    setQueryState(prev => prettify(prev));
  }

  return (
    <div className="p-2">
      <p>{data?.page.graphiql.title}</p>
      <label>
        {data?.page.graphiql.endpoint}
        <Input onChange={e => setEndpointState(e.target.value)} value={endpointState} />
      </label>
      <label>
        {data?.page.graphiql.sdl}
        <Input placeholder={`${endpointState}?sdl`} />
      </label>
      <Accordion type="single" collapsible>
        <AccordionItem value="headers">
          <label>
            <AccordionTrigger>{data?.page.graphiql.headers}</AccordionTrigger>
            <AccordionContent className="flex">
              <Input placeholder={data?.page.graphiql.key} />
              <Input placeholder={data?.page.graphiql.value} />
              <Button>{data?.page.graphiql.add}</Button>
            </AccordionContent>
          </label>
        </AccordionItem>
      </Accordion>
      <label>{data?.page.graphiql.query}</label>
      <ReactCodeMirror
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={value => setQueryState(value)}
        value={queryState}
      />
      <div className="flex gap-1 py-1">
        <Button onClick={() => HandleSendRequest()}>{data?.page.graphiql.send}</Button>
        <Button onClick={() => HandlePrettify()}>Prettify</Button>
      </div>
      <div>
        <label>{data?.page.graphiql.response}</label>
        {children}
      </div>
    </div>
  );
}
