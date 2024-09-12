/* eslint-disable react-compiler/react-compiler */

//import 'server-only';
import JSONViewer from '../JSONViewer/JSONViewer';
import prettify from '../../utils/prettify';

export default async function GraphiQLResponse({
  endpoint,
  query,
  variables,
  searchParams,
}: {
  endpoint: string;
  query: string;
  variables: string | undefined;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let statusCode: number | undefined;

  function fetchGraphQL(value: string) {
    const graphQLBody = JSON.stringify({
      query: value,
      variables: variables ? JSON.parse(variables) : {},
    });

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (searchParams) {
      for (const param in searchParams) {
        if (searchParams[param] !== undefined && typeof searchParams[param] !== 'object') {
          myHeaders.append(param, searchParams[param]);
        }
      }
  }

    return fetch(endpoint, {
      method: 'POST',
      headers: myHeaders,
      body: graphQLBody,
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

  return <JSONViewer value={prettifiedResponse} statusCode={statusCode} />;
}
