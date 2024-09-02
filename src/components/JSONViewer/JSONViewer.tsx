/* eslint-disable react-compiler/react-compiler */


import 'server-only';
import Codemirror from '../codeMirror/codeMirror.component';
import prettify from '../../utils/prettify';

export default async function JSONViewer({ endpoint, query }: { endpoint: string; query: string }) {
  let statusCode;

  function fetchGraphQL(value: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: value,
      variables: {},
    });

    return fetch(endpoint, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    })
      .then(response => {
        statusCode = response.status;
        return response.text();
      })
      .then(result => {
        return result;
      })
      .catch(error => error);
  }

  const response: string = await fetchGraphQL(query);
  const prettifiedResponse = prettify(response);

  return (
    <div>
      <p>
        <i>{`Status code: ${statusCode}\n`}</i>
      </p>
      <Codemirror value={prettifiedResponse} />
    </div>
  );
}
