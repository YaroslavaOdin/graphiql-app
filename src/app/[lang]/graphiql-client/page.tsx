'use client';

import ReactCodeMirror from '@uiw/react-codemirror';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';

export default function GraphiQLPage(): JSX.Element {
  const [endpoint, setEndpoint] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  function fetchGrapghQL(value: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: value,
      variables: {},
    });

    const encodedQuery = btoa(value);
    const encodedEndpoint = btoa(endpoint);

    fetch(endpoint, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    })
      .then(response => response.text())
      .then(result => {
        setResponse(result);
        history.pushState(
          null,
          '',
          `/en/graphiql-client/GRAPHQL/${encodedEndpoint}/${encodedQuery}`,
        );
      })
      .catch(error => setResponse(error));
  }

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
      <Accordion type='single' collapsible>
        <AccordionItem value='headers'>
          <label>
            <AccordionTrigger>Headers:</AccordionTrigger>
            <AccordionContent className='flex'>
              <Input placeholder='Header Key'/>
              <Input placeholder='Header Value' />
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
        onChange={value => fetchGrapghQL(value)}
      />
      <label>Response:</label>
      <ReactCodeMirror  basicSetup={{
          lineNumbers: false,
        }} 
        readOnly={true} 
        value={response}
        />
    </div>
  );
}
