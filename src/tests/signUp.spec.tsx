import { describe, expect, vi, it, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import SignUp from '../components/signUpButton/signUp.component';
import { renderWithProviders } from '../utils/test-redux';

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        replace: vi.fn(),
      }),
      usePathname: () => '/ru',
    }));
  });
  it('should render SignUp Component with the correct link and text', () => {
    const lang = 'ru';
    const text = 'Регистрация';

    renderWithProviders(<SignUp lang={lang} text={text} />);
    const buttonLink = screen.getByRole('button', { name: /регистрация/i });
    expect(buttonLink).toBeInTheDocument();
  });
});
