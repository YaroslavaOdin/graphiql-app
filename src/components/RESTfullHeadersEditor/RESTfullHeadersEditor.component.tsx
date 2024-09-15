'use client';

import { SetStateAction, useState, Dispatch } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useParams, useSearchParams } from 'next/navigation';
import { Locale } from '../../../i18n.config';
import { useGetTextByLangQuery } from '../../store/reducers/apiLanguageSlice';

interface RESTfullHeadersEditorProps {
  setHeaders: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  headers: object;
}

export default function RESTfullHeadersEditor({ setHeaders, headers }: RESTfullHeadersEditorProps) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  // const searchParams = useSearchParams()

  const { lang }: { lang: Locale } = useParams();
  const { data } = useGetTextByLangQuery(lang);

  function handleHeadersChange() {
    setHeaders({ ...headers, [key]: value });
    setKey('');
    setValue('');
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="headers">
        <label>
          <AccordionTrigger>{data?.page.restClient.headers}</AccordionTrigger>
          {Object.keys(headers).length !== 0 &&
            Object.keys(headers).map((item, i) => <div key={i}>{item}</div>)}
          <AccordionContent className="flex">
            <Input value={key} placeholder="key" onChange={e => setKey(e.target.value)} />
            <Input value={value} placeholder="value" onChange={e => setValue(e.target.value)} />
            <Button onClick={handleHeadersChange}>{data?.page.restClient.addHeaders}</Button>
          </AccordionContent>
        </label>
      </AccordionItem>
    </Accordion>
  );
}
