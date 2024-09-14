import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, expect, vi, it, Mock, beforeEach } from 'vitest';
import { Locale } from '../../i18n.config';

import { renderWithProviders } from '../utils/test-redux';
import { mockRequest } from '../utils/mock/mockData';
import History, { HistoryPageProps } from '../app/[lang]/history/page';

import { useRouter } from 'next/navigation';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'next/navigation';
import NoAnyRequests from '../components/noAnyRequests/noAnyRequests.components';

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
}));

async function resolvedComponent(
  Component: (props: HistoryPageProps) => Promise<React.JSX.Element>,
  props: HistoryPageProps,
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

describe('history component', () => {
  const mockRouter = useRouter();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('redirect to home if there is no user', async () => {
    (useAuthState as Mock).mockReturnValue([null, false]);
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });

    const HistoryResolved = await resolvedComponent(History, { params: { lang: 'en' as Locale } });
    renderWithProviders(<HistoryResolved />);

    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  it('should not redirect if there is a user', async () => {
    (useAuthState as Mock).mockReturnValue([{ uuid: 'test-user' }, false]);

    const HistoryResolved = await resolvedComponent(History, { params: { lang: 'en' as Locale } });

    renderWithProviders(<HistoryResolved />);

    waitFor(() => {
      expect(mockRouter.push).not.toHaveBeenCalledWith('/');
    });
  });
  it('shows saved requests', async () => {
    (useAuthState as Mock).mockReturnValue([{ uuid: 'test-user' }, false]);
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });

    const HistoryResolved = await resolvedComponent(History, { params: { lang: 'en' as Locale } });
    renderWithProviders(<HistoryResolved />, {
      preloadedState: {
        history: {
          request: mockRequest,
        },
      },
    });

    const requests = await screen.findAllByRole('item-request');
    requests.forEach(item => {
      expect(item).toBeInTheDocument();
    });
  });
  it('shows saved requests', async () => {
    (useAuthState as Mock).mockReturnValue([{ uuid: 'test-user' }, false]);
    vi.mocked(useParams).mockReturnValue({ lang: 'en' });

    const HistoryResolved = await resolvedComponent(History, { params: { lang: 'en' as Locale } });
    renderWithProviders(<HistoryResolved />, {
      preloadedState: {
        history: {
          request: [],
        },
      },
    })
    renderWithProviders(<NoAnyRequests lang={"en" as Locale}/>)

  })
  
});
