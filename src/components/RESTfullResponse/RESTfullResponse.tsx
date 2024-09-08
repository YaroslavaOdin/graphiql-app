/* eslint-disable react-compiler/react-compiler */

import { requestBody } from '../../interfaces/interfaces';
import { prettifyJSON } from '../../utils/prettifyJSON';
import JSONViewer from '../JSONViewer/JSONViewer';

export default async function RESTfullResponse({
  method,
  endpoint,
  body,
}: {
  method: string;
  endpoint: string;
  body?: string;
}) {
  let statusCode: number | undefined;
  const fetchRESTfull = (bodyValue?: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body: requestBody = {
      method: method,
      headers: headers,
      body: bodyValue,
    };

    return fetch(endpoint, body)
      .then(response => {
        statusCode = response.status;
        return response.text();
      })
      .then(result => {
        return result;
      })
      .catch(error => error);
  };

  const response: string = prettifyJSON(await fetchRESTfull(body));

  return <JSONViewer value={response} statusCode={statusCode} />;
}
