import { Suspense } from 'react';
import GraphiQLClient from '../../../components/graphiqlClient/graphiqlClient';
import JSONViewer from '../../../components/JSONViewer/JSONViewer';

export default function GraphiQLPage(): JSX.Element {
  return (
    <Suspense>
      <GraphiQLClient>
        <JSONViewer value="" statusCode={undefined} />
      </GraphiQLClient>
    </Suspense>
  );
}
