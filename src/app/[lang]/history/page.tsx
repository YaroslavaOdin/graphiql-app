'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebaseConfig';

export default function HistoryPage(): JSX.Element {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, router, loading]);

  return <div>{user?.displayName}</div>;
}
