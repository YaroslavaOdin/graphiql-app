import nextBase64 from 'next-base64';
import RESTfullResponse from '../../../../../../components/RESTfullResponse/RESTfullResponse';
import RESTfullClient from '../../../../../../components/RESTfullClient/RESTfullClient';

export default function RESTfullPage({
  params,
  searchParams,
}: {
  params: { method: string; endpoint: string; body: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element {
  const method = params.method;
  const endpoint = nextBase64.decode(params.endpoint);
  const body = nextBase64.decode(params.body);

  return (
    <RESTfullClient>
      <RESTfullResponse
        method={method}
        endpoint={endpoint}
        bodyValue={body}
        searchParams={searchParams}
      ></RESTfullResponse>
    </RESTfullClient>
  );
}
