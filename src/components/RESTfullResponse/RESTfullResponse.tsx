/* eslint-disable react-compiler/react-compiler */
import { requestBody } from '../../interfaces/interfaces';

import { prettifyJSON } from '../../utils/prettifyJSON';
import JSONViewer from '../JSONViewer/JSONViewer';

export default async function RESTfullResponse({
  method,
  endpoint,
  bodyValue,
  searchParams,
}: {
  method: string;
  endpoint: string;
  bodyValue?: string;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let headers;
  let statusCode: number | undefined;
  const fetchRESTfull = (bodyValue?: string) => {
    headers = new Headers();
    if (searchParams) {
      for (const param in searchParams) {
        if (searchParams[param] !== undefined && typeof searchParams[param] !== 'object') {
          headers.append(param, searchParams[param]);
        }
      }
    }

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

  const response: string = prettifyJSON(await fetchRESTfull(bodyValue));

  return <JSONViewer value={response} statusCode={statusCode} />;
}
