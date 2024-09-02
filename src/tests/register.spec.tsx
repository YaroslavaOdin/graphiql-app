import { describe, expect, vi, it, afterEach, Mock } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import Register from '../app/[lang]/register/page';
import { renderWithProviders } from '../utils/test-redux';
import { Locale } from '../../i18n.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { mockDataForRTKHookInMainPage } from '../utils/mock/mockData';
import userEvent from '@testing-library/user-event';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useCreateUserWithEmailAndPassword: vi.fn(),
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
    renderWithProviders(<Register params={params} />);

    const inputPassword = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(createUserMock).not.toHaveBeenCalled();

    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('check if we create and send data of new user', async () => {
    const createUserMock = vi.fn();
    const mockError = new Error('Mock Error');

    (useCreateUserWithEmailAndPassword as Mock).mockReturnValue([
      createUserMock,
      false,
      { uid: '123' },
      mockError,
    ]);
    const user = userEvent.setup();

    const unsubscribeMock = vi.fn();
    mockAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return unsubscribeMock;
    });
    mockUseGetTextByLangQuery.mockReturnValue(mockDataForRTKHookInMainPage);

    renderWithProviders(<Register params={params} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const inputPassword = screen.getByLabelText(/password/i);
    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputUserName = screen.getByRole('textbox', { name: /username/i });

    await user.type(inputUserName, 'alex');
    await user.type(inputPassword, 'password123');
    await user.type(inputEmail, 'test@example.com');

    await user.click(submitButton);

    expect(createUserMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
