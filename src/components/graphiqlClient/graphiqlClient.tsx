'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import prettify from '../../utils/prettify';
import GraphqlVariablesEditor from '../graphqlVariablesEditor/graphqlVariablesEditor.component';
import { decodedQueryType } from '../../interfaces/interfaces';
// import {
//   DocExplorer,
//   EditorContextProvider,
//   ExplorerContextProvider,
//   SchemaContextProvider,
// } from '@graphiql/react';

import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import useActions from '../../hooks/useAction';
import ComponentForCheckAuth from '../componentForCheckAuth/componentForCheckAuth.component';
// import { FaRegFileCode } from 'react-icons/fa'; 
import SchemaViewer from '../SchemaViewer/SchemaViewer';

export default function GraphiQLClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const [endpointState, setEndpointState] = useState<string>('');
  const [sdlState, setSdlState] = useState<string>('');
  const [queryState, setQueryState] = useState<string>('');
  const [headers, setHeaders] = useState<object>({});
  const [headersValue, setHeadersValue] = useState<string>('');
  const [headersKey, setHeadersKey] = useState<string>('');
  const [queryString, setQueryString] = useState<string>('');
  const [schema, setSchema] = useState<GraphQLSchema>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { lang, endpoint, query }: { lang: Locale; endpoint: string; query: string } = useParams();

  const { data } = useGetTextByLangQuery(lang);

  const [variables, setVariables] = useState('');
  const [valueCodeMirror, setValueCodeMirror] = useState('');
  const { storeRequest } = useActions();
  const newPath = useMemo(() => {
    const encodedEndpoint = nextBase64.encode(endpointState).replace(/=/g, '');
    const encodedQuery = nextBase64.encode(queryState).replace(/=/g, '');

    return `/${lang}/graphiql-client/GRAPHQL/${encodedEndpoint}/${encodedQuery}?${queryString}`;
  }, [endpointState, lang, queryState, queryString]);

  const [keyAndValue] = searchParams.entries();

  useEffect(() => {
    async function fetchSchema(): Promise<void> {
      try {
        const response = await fetch(sdlState, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        });
        const result = await response.json();
        const schema = buildClientSchema(result.data);
        setSchema(schema);
      } catch (error) {
        setSchema(undefined);
      }
    }
    fetchSchema();
  }, [sdlState]);

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
      const decodedQuery: decodedQueryType = JSON.parse(nextBase64.decode(query));
      setQueryState(nextBase64.decode(query));
      setValueCodeMirror(decodedQuery.query);
    }
  }, [endpoint, query]);

  function HandleSendRequest() {
    storeRequest(newPath);
    router.push(newPath);
  }

  function HandleFocusOut() {
    history.replaceState(null, '', newPath);
  }

  function HandlePrettify() {
    setValueCodeMirror(prev => prettify(prev));
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function HandleAddHeader() {
    if (headersKey && headersValue) {
      setHeaders({ ...headers, [headersKey]: headersValue });
      setQueryString(createQueryString(headersKey, headersValue));
      history.replaceState(null, '', pathName + '?' + createQueryString(headersKey, headersValue));
      setHeadersKey('');
      setHeadersValue('');
    }
  }
  console.log(schema)
  return (
    <div className="p-2 container max-w-[1200px]">
      <p className="text-center">{data?.page.graphiql.title}</p>
      <label>
        {data?.page.graphiql.endpoint}
        <Input
          onChange={e => {
            setEndpointState(e.target.value);
            setSdlState(e.target.value + '?sdl');
          }}
          value={endpointState}
        />
      </label>
      <label>
        {data?.page.graphiql.sdl}
        <Input
          value={sdlState}
          onChange={e => {
            setSdlState(e.target.value);
          }}
        />
      </label>
      <Accordion type="single" collapsible>
        <AccordionItem value="headers">
          <label>
            <AccordionTrigger>{data?.page.graphiql.headers}</AccordionTrigger>
            <AccordionContent className="flex">
              <Input
                defaultValue={keyAndValue && keyAndValue[0]}
                placeholder={data?.page.graphiql.key}
                onChange={e => setHeadersKey(e.target.value)}
              />
              <Input
                defaultValue={keyAndValue && keyAndValue[1]}
                placeholder={data?.page.graphiql.value}
                onChange={e => setHeadersValue(e.target.value)}
              />
              <Button onClick={() => HandleAddHeader()}>{data?.page.graphiql.add}</Button>
            </AccordionContent>
          </label>
        </AccordionItem>
      </Accordion>
      <GraphqlVariablesEditor
        text={data?.page.restClient.variables}
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
      <SchemaViewer schema={schema}  sdlState={sdlState}/>
      {/* {schema && (
  <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
    <EditorContextProvider>
      <SchemaContextProvider fetcher={createGraphiQLFetcher({ url: sdlState })}>
        <ExplorerContextProvider>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaRegFileCode className="mr-2 text-gray-600" /> GraphiQL Explorer
            </h2>
            <div className="overflow-visible p-4 bg-white border border-gray-200 rounded-md">
              <DocExplorer />
            </div>
          </div>
        </ExplorerContextProvider>
      </SchemaContextProvider>
    </EditorContextProvider>
  </div>
)} */}
      {/* {schema && (
        <div className="overflow-visible">
          <EditorContextProvider>
            <SchemaContextProvider fetcher={createGraphiQLFetcher({ url: sdlState })}>
              <ExplorerContextProvider>
                <DocExplorer />
              </ExplorerContextProvider>
            </SchemaContextProvider>
          </EditorContextProvider>
        </div>
      )} */}
      <ComponentForCheckAuth />
    </div>
  );
}
