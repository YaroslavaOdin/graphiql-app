'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import prettify from '../../utils/prettify';
import MethodSwitcher from '../RESTfullMethodSwitcher/RESTfullMethodSwitcher.component';
import RESTfullvariablesEditor from '../RESTfullvariablesEditor/RESTfullvariablesEditor.component';
import { jsonrepair } from 'jsonrepair';
import { findNestedValueIfExist } from '../../utils/functionHelpers';


export default function RESTfullClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const router = useRouter();
  const [endpointState, setEndpointState] = useState<string>('');
  const [bodyState, setBodyState] = useState<string>('');
  const [methodState, setMethodState] = useState<string>('GET');
  const {
    lang,
    method,
    endpoint,
    body,
  }: { lang: Locale; method: string; endpoint: string; body: string } = useParams();
  const { data } = useGetTextByLangQuery(lang);

  const [variables, setVariables] = useState<{ [key: string]: unknown }>({});
  const [valueCodeMirror, setValueCodeMirror] = useState('');

  const newPath = useMemo(() => {
    const encodedEndpoint = nextBase64.encode(endpointState).replace(/=/g, '');
    const encodedBody = nextBase64.encode(bodyState).replace(/=/g, '');
    return `/${lang}/restfull-client/${methodState}/${encodedEndpoint}/${encodedBody}`;
  }, [methodState, endpointState, bodyState, lang]);

  useEffect(() => {
    if (endpoint && body) {
      setEndpointState(nextBase64.decode(endpoint));
      setBodyState(nextBase64.decode(body));
    }
  }, [method, endpoint, body]);

  const HandleSendRequest = (): void => {
    router.push(newPath);
  };

  const HandleFocusOut = (): void => {
    history.replaceState(null, '', newPath);
  };

  const HandlePrettify = (): void => {
    setValueCodeMirror(prev => prettify(prev));
  };

  const handleMethodChange = (value: string): void => {
    setMethodState(value);
  };

  useEffect(() => {
    if (Object.keys(variables).length !== 0 && valueCodeMirror) {
      const repairJson = jsonrepair(valueCodeMirror);
      const parseJson = JSON.parse(repairJson);

      const newBody: object = findNestedValueIfExist(parseJson, variables);

      setBodyState(JSON.stringify(newBody));
    }
  }, [valueCodeMirror, variables, newPath]);

  useEffect(() => {
    setValueCodeMirror(prettify(bodyState));
  }, [bodyState]);

  return (
    <div className="p-5">
      <div>
        <h1 className="flex justify-center">{data?.page.restClient.title}</h1>
      </div>
      <label>
        {data?.page.restClient.endpoint}
        <Input onChange={e => setEndpointState(e.target.value)} value={endpointState} />
      </label>
      <div>{data?.page.restClient.methods}</div>
      <MethodSwitcher onChange={handleMethodChange}></MethodSwitcher>

      <RESTfullvariablesEditor variables={variables} setVariables={setVariables} />
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
    </div>
  );
}
