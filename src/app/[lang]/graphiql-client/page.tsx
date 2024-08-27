import GraphiQLClient from '../../../components/graphiqlClient/graphiqlClient';
import JSONViewer from '../../../components/JSONViewer/JSONViewer';

interface GraphiQLPageProps {
  searchParams: { query: string };
}

export default function GraphiQLPage({searchParams}:GraphiQLPageProps): JSX.Element {

  
  return (
    <GraphiQLClient>
      <JSONViewer
        endpoint="https://rickandmortyapi.com/graphql"
        query={searchParams.query}
        // query="{ characters(page: 3) { info { count } results { name } }}"
      ></JSONViewer>
    </GraphiQLClient>
  );
}
