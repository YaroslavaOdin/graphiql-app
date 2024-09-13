import { describe, expect, vi, it, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import SignOut from '../components/signOutButton/signOut.component';
import { renderWithProviders } from '../utils/test-redux';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));


describe('SignIn Component', () => {
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        replace: vi.fn(),
      }),
      usePathname: () => '/ru',
    }));
  });

  it('should render SignOut Component with the correct link and text', () => {
    const text = 'Выйти';

    renderWithProviders(<SignOut text={text} />);
    const buttonLink = screen.getByRole('button', { name: /выйти/i });
    expect(buttonLink).toBeInTheDocument();
  });

});
