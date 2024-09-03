import GraphiQLClient from '../../../components/graphiqlClient/graphiqlClient';
import JSONViewer from '../../../components/JSONViewer/JSONViewer';

export default function GraphiQLPage(): JSX.Element {
  return (
    <GraphiQLClient>
      <JSONViewer value="" statusCode={undefined} />
    </GraphiQLClient>
  );
}
