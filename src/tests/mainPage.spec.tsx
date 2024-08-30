import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from '../app/[lang]/page';
import { describe, expect, vi, it, } from 'vitest';
import { Locale } from '../../i18n.config';
import { useGetTextByLangQuery } from '../store/reducers/apiLanguageSlice';
import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../utils/firebaseConfig';




// vi.mock('firebase/auth', () => ({
//   onAuthStateChanged: vi.fn(),
// }));

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    onAuthStateChanged: vi.fn(), 
  }
})


vi.mock('firebase/app', () => {

  return {
    // ...actualFirebaseApp,
    initializeApp: vi.fn((config) => {
      // Simulate app initialization
      return { name: '[DEFAULT]', options: config };
    }),
    getApps: vi.fn(() => [{ name: '[DEFAULT]' }]), // Simulate that the app is already initialized
    getApp: vi.fn(() => ({ name: '[DEFAULT]' })), // Return a mock app instance
  };
});

// vi.mock('../../store/reducers/apiLanguageSlice', () => ({
//   useGetTextByLangQuery: vi.fn(),
// }));

describe('Home component', () => {
  it('renders correctly with given params', () => {
    const params = { lang: 'en' as Locale };
    // const mockUser = { displayName: 'Test User' };

    // // Mock Firebase authentication behavior
    // mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
    //   callback(mockUser); // simulate a logged-in user
    //   return vi.fn(); // return a mock unsubscribe function
    // });

    // // Mock API response for text by language
    // mocked(useGetTextByLangQuery).mockReturnValue({
    //   data: {
    //     page: {
    //       home: {
    //         greeting: 'Hello',
    //         nameOfPage: 'Home Page',
    //       },
    //     },
    //   },
    // });


    render(<MainPage params={params} />);

    // // Assertions
    // expect(screen.getByText(/Hello/)).toBeInTheDocument();
    // expect(screen.getByText(/Test User/)).toBeInTheDocument();
    // expect(screen.getByText(/Home Page/)).toBeInTheDocument();
  });
});