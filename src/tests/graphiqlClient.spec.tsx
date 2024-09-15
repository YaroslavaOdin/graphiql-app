import { describe, vi, it, Mock } from 'vitest';
import { renderWithProviders } from '../utils/test-redux';
import JSONViewer from '../components/JSONViewer/JSONViewer';
import { useParams, useSearchParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { mockDataForRTKHookInMainPage } from '../utils/mock/mockData';
import GraphiQLClient from '../components/graphiqlClient/graphiqlClient';

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
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
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

describe('GraphiQLClient component', () => {
  it('render GraphiQLClient', () => {
    (useSearchParams as Mock).mockReturnValue(['key']);
    (useAuthState as Mock).mockReturnValue([null, false]);
    (useGetTextByLangQuery as Mock).mockReturnValue(mockDataForRTKHookInMainPage);
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });

    renderWithProviders(
      <GraphiQLClient>
        <JSONViewer value="" statusCode={undefined} />
      </GraphiQLClient>,
    );
  });
});
