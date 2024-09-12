'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useParams, useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import prettify from '../../utils/prettify';
import GraphqlVariablesEditor from '../graphqlVariablesEditor/graphqlVariablesEditor.component';
import { decodedQueryType } from '../../interfaces/interfaces';

export default function GraphiQLClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const [endpointState, setEndpointState] = useState<string>('');
  const [queryState, setQueryState] = useState<string>('');
  const router = useRouter();
  const { lang, endpoint, query }: { lang: Locale; endpoint: string; query: string } = useParams();

  const { data } = useGetTextByLangQuery(lang);

  const [variables, setVariables] = useState('');
  const [valueCodeMirror, setValueCodeMirror] = useState('');

  const newPath = useMemo(() => {
    const encodedEndpoint = nextBase64.encode(endpointState).replace(/=/g, '');
    const encodedQuery = nextBase64.encode(queryState).replace(/=/g, '');

    return `/${lang}/graphiql-client/GRAPHQL/${encodedEndpoint}/${encodedQuery}`;
  }, [endpointState, lang, queryState]);

  useEffect(() => {
    if (Object.keys(variables).length !== 0 && valueCodeMirror) {
      const newBody = JSON.stringify({
        query: valueCodeMirror,
        variables: variables,
      });

      setQueryState(newBody);
    } else {
      const res = JSON.stringify({ query: valueCodeMirror });
      setQueryState(res);
    }
  }, [valueCodeMirror, variables, newPath, queryState]);

  useEffect(() => {
    if (endpoint && query) {
      setEndpointState(nextBase64.decode(endpoint));
      const decodedQuery:decodedQueryType = JSON.parse(nextBase64.decode(query));
      setQueryState(nextBase64.decode(query));
      setValueCodeMirror(decodedQuery.query);
    }
  }, [endpoint, query]);

  function HandleSendRequest() {
    router.push(newPath);
  }

  function HandleFocusOut() {
    history.replaceState(null, '', newPath);
  }

  function HandlePrettify() {
    setValueCodeMirror(prev => prettify(prev));
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
      <GraphqlVariablesEditor
        variables={variables}
        setVariables={setVariables}
        HandleFocusOut={HandleFocusOut}
      />
      <label>{data?.page.graphiql.query}</label>

      <ReactCodeMirror
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={value => setValueCodeMirror(value)}
        value={valueCodeMirror}
        onBlur={() => HandleFocusOut()}
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
