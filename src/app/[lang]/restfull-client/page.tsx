import { Suspense } from 'react';
import JSONViewer from '../../../components/JSONViewer/JSONViewer';
import RESTfullClient from '../../../components/RESTfullClient/RESTfullClient';

export default function RESTfullPage(): JSX.Element {
  return (
    <Suspense>
      <RESTfullClient>
        <JSONViewer value="" statusCode={undefined} />
      </RESTfullClient>
    </Suspense>
  );
}
