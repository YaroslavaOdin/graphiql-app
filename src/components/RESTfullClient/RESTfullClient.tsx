'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import MethodSwitcher from '../RESTfullMethodSwitcher/RESTfullMethodSwitcher.component';
import { prettifyJSON } from '../../utils/prettifyJSON';
import RESTfullvariablesEditor from '../RESTfullvariablesEditor/RESTfullvariablesEditor.component';
import RESTfullHeadersEditor from '../RESTfullHeadersEditor/RESTfullHeadersEditor.component';
import useActions from '../../hooks/useAction';
import ComponentForCheckAuth from '../componentForCheckAuth/componentForCheckAuth.component';

export default function RESTfullClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    lang,
    method,
    endpoint,
    body,
  }: { lang: Locale; method?: string; endpoint?: string; body?: string } = useParams();

  const [endpointState, setEndpointState] = useState<string>(nextBase64.decode(endpoint || ''));
  const [bodyState, setBodyState] = useState<string>(nextBase64.decode(body || ''));
  const [methodState, setMethodState] = useState<string>(method || 'GET');
  const [variables, setVariables] = useState<{ [key: string]: unknown }>({});
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});
  const [valueCodeMirror, setValueCodeMirror] = useState('');

  const { data } = useGetTextByLangQuery(lang);
  const { storeRequest } = useActions();

  const newPath = useMemo(() => {
    const encodedEndpoint = nextBase64.encode(endpointState).replace(/=/g, '');
    const encodedBody = nextBase64.encode(bodyState).replace(/=/g, '');
    return `/${lang}/restfull-client/${methodState}/${encodedEndpoint}/${encodedBody}`;
  }, [methodState, endpointState, bodyState, lang]);

  const updateSearchQuery = useCallback(
    (updatedQuery: { [key: string]: string }) => {
      const params = new URLSearchParams(`${searchParams}`);
      Object.keys(updatedQuery).forEach(key => {
        if (updatedQuery[key]) {
          params.set(key, updatedQuery[key]);
        } else {
          params.delete(key);
        }
      });
      const queryString = params.toString();
      return queryString ? `${newPath}?${queryString}` : newPath;
    },
    [searchParams, newPath],
  );

  useEffect(() => {
    history.replaceState(null, '', newPath);
  }, [newPath]);

  const HandleSendRequest = (): void => {
    storeRequest(newPath);
    router.push(newPath);
  };

  const HandleFocusOut = (): void => {
    replaceVariables();
    history.replaceState(null, '', newPath);
  };

  const HandlePrettify = (): void => {
    setValueCodeMirror(request => prettifyJSON(request));
  };

  const handleMethodChange = (value: string): void => {
    setMethodState(value);
  };

  function replaceVariables() {
    if (Object.keys(variables).length !== 0) {
      let res = valueCodeMirror;

      for (const key in variables) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        res = res.replace(regex, JSON.stringify(variables[key]));
      }
      setBodyState(res);
    } else {
      setBodyState(valueCodeMirror);
    }
  }

  useEffect(() => {
    history.replaceState(null, '', updateSearchQuery(headers));
  }, [headers, updateSearchQuery]);

  useEffect(() => {
    setValueCodeMirror(prettifyJSON(bodyState));
  }, [bodyState]);

  return (
    <div className="p-5 container max-w-[1200px]">
      <div>
        <h1 className="flex justify-center">{data?.page.restClient.title}</h1>
      </div>
      <label>
        {data?.page.restClient.endpoint}
        <Input onChange={e => setEndpointState(e.target.value.trim())} value={endpointState} />
      </label>
      <div>{data?.page.restClient.methods}</div>
      <MethodSwitcher onChange={handleMethodChange} method={method}></MethodSwitcher>
      <RESTfullvariablesEditor
        variables={variables}
        setVariables={setVariables}
        title={data?.page.restClient.variables}
        buttonVariables={data?.page.restClient.buttonVariables}
      />
      <RESTfullHeadersEditor headers={headers} setHeaders={setHeaders} />
      <label>{data?.page.restClient.requestBody}</label>
      <ReactCodeMirror
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={value => setValueCodeMirror(value)}
        value={valueCodeMirror}
        onBlur={() => HandleFocusOut()}
      />
      <div className="flex gap-1 py-1">
        <Button onClick={() => HandleSendRequest()}>{data?.page.restClient.sendBtn}</Button>
        <Button onClick={() => HandlePrettify()}>{data?.page.restClient.prettifyBtn}</Button>
      </div>
      <div>
        <label>{data?.page.restClient.response}</label>
        {children}
      </div>
      <ComponentForCheckAuth />
    </div>
  );
}
