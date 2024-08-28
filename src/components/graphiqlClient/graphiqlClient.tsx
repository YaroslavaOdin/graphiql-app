'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';

export default function GraphiQLClient({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { endpoint: string; query: string };
}): JSX.Element {
  const [endpoint, setEndpoint] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  return (
    <div>
      <p>GraphiQL Client</p>
      <label>
        Endpoint
        <Input onChange={e => setEndpoint(e.target.value)} value={endpoint} />
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
        onChange={value => {
          setQuery(value);
          history.replaceState(
            null,
            '',
            `/en/graphiql-client/GRAPHQL/${nextBase64.encode(endpoint).split('=').join('')}/${nextBase64.encode(value).split('=').join('')}`,
          );
          router.refresh();
        }}
        value={query}
      />
      <label>Response:</label>
      {children}
    </div>
  );
}
