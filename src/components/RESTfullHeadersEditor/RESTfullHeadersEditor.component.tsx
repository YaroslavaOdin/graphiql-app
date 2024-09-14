'use client';

import { SetStateAction, useState, Dispatch } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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

  function handleHeadersChange() {
    setHeaders({ ...headers, [key]: value });
    setKey('');
    setValue('');
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="headers">
        <label>
          <AccordionTrigger>Headers</AccordionTrigger>
          {Object.keys(headers).length !== 0 &&
            Object.keys(headers).map((item, i) => <div key={i}>{item}</div>)}
          <AccordionContent className="flex">
            <Input value={key} placeholder="key" onChange={e => setKey(e.target.value)} />
            <Input value={value} placeholder="value" onChange={e => setValue(e.target.value)} />
            <Button onClick={handleHeadersChange}>Add</Button>
          </AccordionContent>
        </label>
      </AccordionItem>
    </Accordion>
  );
}
