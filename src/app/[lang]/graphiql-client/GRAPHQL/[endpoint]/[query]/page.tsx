import nextBase64 from 'next-base64';
import GraphiQLClient from '../../../../../../components/graphiqlClient/graphiqlClient';
import JSONViewer from '../../../../../../components/JSONViewer/JSONViewer';

export default function GraphiQLPage({
  params,
}: {
  params: { endpoint: string; query: string };
}): JSX.Element {
  const endpoint = nextBase64.decode(params.endpoint);
  const query = nextBase64.decode(params.query);
  return (
    <GraphiQLClient>
      <JSONViewer endpoint={endpoint} query={query}></JSONViewer>
    </GraphiQLClient>
  );
}
