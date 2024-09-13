import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
// import MainPage from '../app/[lang]/page';
import MainPage from '../components/mainPage/mainPage.component';
import { describe, expect, vi, it, afterEach, Mock } from 'vitest';
import { Locale } from '../../i18n.config';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { renderWithProviders } from '../utils/test-redux';
import { mockDataForRTKHookInMainPage, mockUser } from '../utils/mock/mockData';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
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

const mockAuthStateChanged = onAuthStateChanged as Mock;
const mockUseGetTextByLangQuery = useGetTextByLangQuery as Mock;

describe('Home component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  const lang:Locale = "en";

  it('renders correctly with given params', () => {
    const unsubscribeMock = vi.fn();

    mockAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return unsubscribeMock;
    });

    mockUseGetTextByLangQuery.mockReturnValue(mockDataForRTKHookInMainPage);

    renderWithProviders(<MainPage lang={lang} />);
    const greetingTitle = screen.getByText(/welcome back/i);

    expect(greetingTitle).toBeInTheDocument();
  });

  it('renders user name if user is registered', async () => {
    const unsubscribeMock = vi.fn();
    mockAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return unsubscribeMock;
    });

    mockUseGetTextByLangQuery.mockReturnValue(mockDataForRTKHookInMainPage);

    renderWithProviders(<MainPage lang={lang} />);

    await waitFor(() => {
      expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
    });
  });
});
