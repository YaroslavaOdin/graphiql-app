'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';

export default function GraphiQLClient({
  children,
  params,
}: {
  children: React.JSX.Element;
  params: { endpoint: string; query: string };
}): JSX.Element {
  const [endpoint, setEndpoint] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (params && params.endpoint && params.query) {
      setEndpoint(nextBase64.decode(params.endpoint));
      setQuery(nextBase64.decode(params.query));
    }
  });

  function HandleSendRequest() {
    router.push(
      `/en/graphiql-client/GRAPHQL/${nextBase64.encode(endpoint).split('=').join('')}/${nextBase64.encode(query).split('=').join('')}`,
    );
  }

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
        onChange={value => setQuery(value)}
        value={query}
      />
      <Button onClick={() => HandleSendRequest()}>Send request</Button>
      <div>
        <label>Response:</label>
        {children}
      </div>
    </div>
  );
}
