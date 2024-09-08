import JSONViewer from '../../../components/JSONViewer/JSONViewer';
import RESTfullClient from '../../../components/RESTfullClient/RESTfullClient';

export default function RESTfullPage(): JSX.Element {
  return (
    <RESTfullClient>
      <JSONViewer value="" statusCode={undefined} />
    </RESTfullClient>
  );
}
