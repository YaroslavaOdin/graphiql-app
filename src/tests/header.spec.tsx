import { describe, vi, it, Mock } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../utils/test-redux';
import { useParams, usePathname } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { mockDataForRTKHookInMainPage } from '../utils/mock/mockData';
import Header from '../components/header/header.component';

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

describe('Header component', () => {
  it('render Header', () => {
    (useAuthState as Mock).mockReturnValue([null, false]);
    (useGetTextByLangQuery as Mock).mockReturnValue(mockDataForRTKHookInMainPage);
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });
    vi.mocked(usePathname).mockReturnValue('pathname');
    const { lang }: { lang: 'en' | 'ru' } = useParams();

    renderWithProviders(<Header lang={lang} />);

    screen.logTestingPlaygroundURL();
  });
});
