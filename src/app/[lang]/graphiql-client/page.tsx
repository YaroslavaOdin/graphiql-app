import GraphiQLClient from "../../../components/graphiqlClient/graphiqlClient";
import JSONViewer from "../../../components/JSONViewer/JSONViewer";

export default function GraphiQLPage(): JSX.Element {

  return (
    <GraphiQLClient>
      <JSONViewer endpoint="https://rickandmortyapi.com/graphql" query="{ characters(page: 2) { info { count } results { name } }}"></JSONViewer>
    </GraphiQLClient>
  );
}
