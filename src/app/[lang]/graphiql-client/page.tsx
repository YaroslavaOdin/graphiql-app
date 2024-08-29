import GraphiQLClient from '../../../components/graphiqlClient/graphiqlClient';
import Codemirror from '../../../components/codeMirror/codeMirror.component';

export default function GraphiQLPage(): JSX.Element {
  return (
    <GraphiQLClient>
      <Codemirror value="" />
    </GraphiQLClient>
  );
}
