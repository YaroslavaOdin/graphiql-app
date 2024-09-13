import { describe, expect, vi, it, afterEach, Mock } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import Login from '../app/[lang]/logIn/page';
import { renderWithProviders } from '../utils/test-redux';
import { Locale } from '../../i18n.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { mockDataForRTKHookInMainPage } from '../utils/mock/mockData';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

interface CreateUserWithEmailAndPassword {
  useCreateUserWithEmailAndPassword: Mock;
}

interface ApiLanguageSlice {
  useGetTextByLangQuery: Mock;
}

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', async importOriginal => {
  const actual: CreateUserWithEmailAndPassword = await importOriginal();
  return {
    ...actual,
    useCreateUserWithEmailAndPassword: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../store/reducers/apiLanguageSlice', async importOriginal => {
  const actual: ApiLanguageSlice = await importOriginal();
  return {
    ...actual,
    useGetTextByLangQuery: vi.fn(),
  };
});

const mockAuthStateChanged = onAuthStateChanged as Mock;
const mockUseGetTextByLangQuery = useGetTextByLangQuery as Mock;

describe('Register Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  const params = { lang: 'en' as Locale };

  it('should render Register Component with the correct form', () => {
    const createUserMock = vi.fn();
    const mockError = new Error('Mock Error');
    (useCreateUserWithEmailAndPassword as Mock).mockReturnValue([
      createUserMock,
      false,
      null,
      mockError,
    ]);
    const unsubscribeMock = vi.fn();
    mockAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return unsubscribeMock;
    });
    mockUseGetTextByLangQuery.mockReturnValue(mockDataForRTKHookInMainPage);
    renderWithProviders(<Login params={params} />);

    const inputPassword = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(createUserMock).not.toHaveBeenCalled();

    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
