import { render } from '@testing-library/react';
import RootLayout from '../app/layout';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
    Inter: vi.fn(() => ({
      className: 'inter-class',
    })),
  }));


describe('RootLayout', () => {
  it('renders the content with correct lang and structure', () => {
    const { getByTestId } = render(
        <RootLayout>
          <div data-testid="child-content">Child Content</div>
        </RootLayout>
    );

    const childContent = getByTestId('child-content');
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent('Child Content');
  });
});
