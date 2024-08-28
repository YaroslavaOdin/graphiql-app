import ReactCodeMirror from '@uiw/react-codemirror';
import GraphiQLClient from '../../../components/graphiqlClient/graphiqlClient';

export default function GraphiQLPage(): JSX.Element {
  return (
    <GraphiQLClient>
      <ReactCodeMirror />
    </GraphiQLClient>
  );
}
