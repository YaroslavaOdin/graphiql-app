'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import prettify from '../../utils/prettify';
import MethodSwitcher from '../RESTfullMethodSwitcher/RESTfullMethodSwitcher.component';

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
  const newPath = `/en/restfull-client/${methodState}/${nextBase64.encode(endpointState).split('=').join('')}/${nextBase64.encode(bodyState).split('=').join('')}`;

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
    setBodyState(prev => prettify(prev));
  };

  const handleMethodChange = (value: string): void => {
    setMethodState(value);
  };

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
      <label>{data?.page.restClient.requestBody}</label>
      <ReactCodeMirror
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={value => setBodyState(value)}
        value={bodyState}
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
