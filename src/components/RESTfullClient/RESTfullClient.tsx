'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';
import { Locale } from '../../../i18n.config';
import MethodSwitcher from '../RESTfullMethodSwitcher/RESTfullMethodSwitcher.component';
import { prettifyJSON } from '../../utils/prettifyJSON';
import RESTfullvariablesEditor from '../RESTfullvariablesEditor/RESTfullvariablesEditor.component';
import useActions from '../../hooks/useAction';
import ComponentForCheckAuth from '../componentForCheckAuth/componentForCheckAuth.component';

export default function RESTfullClient({ children }: { children: React.JSX.Element }): JSX.Element {
  const router = useRouter();
  const {
    lang,
    method,
    endpoint,
    body,
  }: { lang: Locale; method?: string; endpoint?: string; body?: string } = useParams();

  const [endpointState, setEndpointState] = useState<string>(nextBase64.decode(endpoint || ''));
  const [bodyState, setBodyState] = useState<string>(nextBase64.decode(body || ''));
  const [methodState, setMethodState] = useState<string>('');

  const { data } = useGetTextByLangQuery(lang);
  const { storeRequest } = useActions();

  const [variables, setVariables] = useState<{ [key: string]: unknown }>({});
  const [valueCodeMirror, setValueCodeMirror] = useState('');

  const newPath = useMemo(() => {
    const encodedEndpoint = nextBase64.encode(endpointState).replace(/=/g, '');
    const encodedBody = nextBase64.encode(bodyState).replace(/=/g, '');
    return `/${lang}/restfull-client/${methodState}/${encodedEndpoint}/${encodedBody}`;
  }, [methodState, endpointState, bodyState, lang]);

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

  useEffect(() => {
    try {
      setValueCodeMirror(prettifyJSON(bodyState));
    } catch (error) {
      console.error(error);
    }
  }, [bodyState]);

  function replaceVariables() {
    if (Object.keys(variables).length !== 0) {
      let res = '';

      for (const key in variables) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        res = valueCodeMirror.replace(regex, JSON.stringify(variables[key]));
      }
      setBodyState(res);
    } else {
      setBodyState(valueCodeMirror);
    }
  }

  return (
    <div className="p-5">
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
        text={data?.page.restClient.variables}
      />
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
