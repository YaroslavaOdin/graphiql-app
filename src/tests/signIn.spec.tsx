import { describe, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SignIn from '../components/signInButton/signIn.component';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => ({
    replace: vi.fn(),
  }),
}));

describe('SignIn Component', () => {
  it('should render SignIn Component with the correct link and text', () => {
    const lang = 'en';
    const text = 'Sign In';

    render(<SignIn lang={lang} text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: text });
    expect(linkElement).toHaveAttribute('href', 'en/logIn');
  });
});
