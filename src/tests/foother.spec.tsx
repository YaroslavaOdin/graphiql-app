import React from 'react';
import { render, screen } from '@testing-library/react';
import Foother from '../components/foother/foother.component';
import { describe, expect, vi, it, afterEach } from 'vitest';

vi.mock('../store/reducers/apiLanguageSlice', () => ({
  useGetTextByLangQuery: vi.fn(),
}));

describe('Foother component', () => {
  const mockLang = 'en';

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Foother correctly', () => {
    render(<Foother lang={mockLang} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Aleksandr')).toBeInTheDocument();
    expect(screen.getByText('Nikolai')).toBeInTheDocument();
    expect(screen.getByText('Yaraslava')).toBeInTheDocument();
  });

  it('contains correct links', () => {
    render(<Foother lang={mockLang} />);

    expect(screen.getByText('Aleksandr').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/Alex991995',
    );
    expect(screen.getByText('Nikolai').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/kaliganoff',
    );
    expect(screen.getByText('Yaraslava').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/YaroslavaOdin',
    );
  });

  it('displays the current year', () => {
    const currentYear = '2024';
    render(<Foother lang={mockLang} />);
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });
});
