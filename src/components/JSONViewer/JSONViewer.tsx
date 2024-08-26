import ReactCodeMirror from '@uiw/react-codemirror';

export default async function JSONViewer({ endpoint, query }: { endpoint: string; query: string }) {
  function fetchGraphQL(value: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: value,
      variables: {},
    });

    //  const encodedQuery = btoa(value);
    //  const encodedEndpoint = btoa(endpoint);

    return fetch(endpoint, {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    })
      .then(response => response.text())
      .then(result => {
        return result;
      })
      .catch(error => error);
  }

  const response = await fetchGraphQL(query);

  return (
    <ReactCodeMirror
      basicSetup={{
        lineNumbers: false,
      }}
      readOnly={true}
      value={response}
    />
  );
}
