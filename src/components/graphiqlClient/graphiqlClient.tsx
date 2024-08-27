'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cloneElement, isValidElement, useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function GraphiQLClient({ children }): JSX.Element {
  const [endpoint, setEndpoint] = useState<string>('https://rickandmortyapi.com/graphql');
  const [query, setQuery] = useState<string>(
    '{ characters(page: 4) { info { count } results { name } }}',
  );
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(()=> {
    const params = new URLSearchParams(searchParams);
    params.set('query', query)

    replace(`${pathname}?${params.toString()}`);
  },[query])


  return (
    <div>
      <p>GraphiQL Client</p>
      <label>
        Endpoint
        <Input onChange={e => setEndpoint(e.target.value)} />
      </label>
      <label>
        SDL Url:
        <Input placeholder={`${endpoint}?sdl`} />
      </label>
      <Accordion type="single" collapsible>
        <AccordionItem value="headers">
          <label>
            <AccordionTrigger>Headers:</AccordionTrigger>
            <AccordionContent className="flex">
              <Input placeholder="Header Key" />
              <Input placeholder="Header Value" />
              <Button>Add header</Button>
            </AccordionContent>
          </label>
        </AccordionItem>
      </Accordion>
      <label>Query:</label>
      <ReactCodeMirror
        basicSetup={{
          lineNumbers: false,
        }}
        onChange={value => setQuery(value)}
      />
      <label>Response:</label>
      {isValidElement(children)
        ? cloneElement(children, { endpoint: endpoint, query: query })
        : children}
    </div>
  );
}
