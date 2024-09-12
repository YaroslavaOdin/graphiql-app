import nextBase64 from 'next-base64';
import GraphiQLClient from '../../../../../../components/graphiqlClient/graphiqlClient';
import GraphiQLResponse from '../../../../../../components/GraphiQLResponse/GraphiQLResponse';
import { decodedQueryType } from '../../../../../../interfaces/interfaces';

export default function GraphiQLPage({
  params,
}: {
  params: { endpoint: string; query: string };
}): JSX.Element {
  const endpoint = nextBase64.decode(params.endpoint);
  const decodedQuery: decodedQueryType = JSON.parse(nextBase64.decode(params.query));

  const { query, variables } = decodedQuery;

  return (
    <GraphiQLClient>
      <GraphiQLResponse endpoint={endpoint} query={query} variables={variables}></GraphiQLResponse>
    </GraphiQLClient>
  );
}
