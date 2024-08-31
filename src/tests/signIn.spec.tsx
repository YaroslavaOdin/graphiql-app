import { describe, expect, vi, it, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import SignIn from '../components/signInButton/signIn.component';
import { renderWithProviders } from '../utils/test-redux';

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        replace: vi.fn(),
      }),
      usePathname: () => '/en/logIn',
    }));
  });

  it('should render SignIn Component with the correct link and text', () => {
    const lang = 'en';
    const text = 'Sign In';

    renderWithProviders(<SignIn lang={lang} text={text} />);

    const linkElement = screen.getByRole('button', { name: /sign in/i });
    expect(linkElement).toBeInTheDocument();
  });
});
