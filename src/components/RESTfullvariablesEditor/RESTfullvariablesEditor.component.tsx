'use client';

import { SetStateAction, useState, Dispatch } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface RESTfullvariablesEditorProps {
  setVariables: Dispatch<
    SetStateAction<{
      [key: string]: unknown;
    }>
  >;
  variables: object;
  title?: string;
  buttonVariables?: string;
}

export default function RESTfullvariablesEditor({
  setVariables,
  variables,
  title,
  buttonVariables,
}: RESTfullvariablesEditorProps) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  function handleVariablesChange() {
    setVariables({ ...variables, [key]: value });
    setKey('');
    setValue('');
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="variables">
        <label>
          <AccordionTrigger>{title}</AccordionTrigger>
          {Object.keys(variables).length !== 0 &&
            Object.keys(variables).map((item, i) => <div key={i}>{item}</div>)}
          <AccordionContent className="flex">
            <Input value={key} placeholder="key" onChange={e => setKey(e.target.value)} />
            <Input value={value} placeholder="value" onChange={e => setValue(e.target.value)} />

            <Button onClick={handleVariablesChange}>{buttonVariables}</Button>
          </AccordionContent>
        </label>
      </AccordionItem>
    </Accordion>
  );
}
