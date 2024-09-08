import nextBase64 from 'next-base64';
import RESTfullResponse from '../../../../../components/RESTfullResponse/RESTfullResponse';
import RESTfullClient from '../../../../../components/RESTfullClient/RESTfullClient';

export default function RESTfullPage({
  params,
}: {
  params: { method: string; endpoint: string };
}): JSX.Element {
  const method = params.method;
  const endpoint = nextBase64.decode(params.endpoint);

  return (
    <RESTfullClient>
      <RESTfullResponse method={method} endpoint={endpoint}></RESTfullResponse>
    </RESTfullClient>
  );
}
