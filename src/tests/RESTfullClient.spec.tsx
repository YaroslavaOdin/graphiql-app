import { describe, expect, vi, it, Mock } from 'vitest';
import { getByRole } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-redux';
// import RESTfullClient from '../components/RESTfullClient/RESTfullClient';
// import JSONViewer from '../components/JSONViewer/JSONViewer';
import { useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { mockDataForRTKHookInMainPage } from '../utils/mock/mockData';
import RESTfullPage from '../app/[lang]/restfull-client/page';
// import RESTfullPageMethodEndpoint from '../app/[lang]/restfull-client/[method]/[endpoint]/page';


vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: vi.fn(),
}));



interface ApiLanguageSlice {
  useGetTextByLangQuery: Mock;
}

vi.mock('../store/reducers/apiLanguageSlice', async importOriginal => {
  const actual: ApiLanguageSlice = await importOriginal();
  return {
    ...actual,
    useGetTextByLangQuery: vi.fn(),
  };
});

describe('RESTfullClient component',  () => {

  // const params =  { method: "GET", endpoint: 'aHR0cHM6Ly9hcGkuZXNjdWVsYWpzLmNvL2FwaS92MS9wcm9kdWN0cw' }

  it('render RESTfullClient without method and endpoint', async () => {

    (useAuthState as Mock).mockReturnValue([{ uuid: 'test-user' }, false]);
    (useGetTextByLangQuery as Mock).mockReturnValue(mockDataForRTKHookInMainPage);
    vi.mocked(useParams).mockReturnValue({ lang: "en" });
    

    const {container} =   renderWithProviders(<RESTfullPage />);

  //  const {container} =  renderWithProviders(
  //     <RESTfullClient>
  //       <JSONViewer value="" statusCode={undefined} />
  //     </RESTfullClient>,
  //   );

     const input = getByRole(container,'textbox', { name: /endpoint:/i })
     expect(input).toBeInTheDocument()

  });
  it('render RESTfullClient with method and endpoint', () => {
    (useAuthState as Mock).mockReturnValue([{ uuid: 'test-user' }, false]);
    (useGetTextByLangQuery as Mock).mockReturnValue(mockDataForRTKHookInMainPage);
    vi.mocked(useParams).mockReturnValue({ lang: "en", method: "GET", endpoint: 'aHR0cHM6Ly9hcGkuZXNjdWVsYWpzLmNvL2FwaS92MS9wcm9kdWN0cw' });

    // renderWithProviders(<RESTfullPageMethodEndpoint params={params}/>);

  })
});
