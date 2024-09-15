'use client';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebaseConfig';
import { useRouter } from 'next/navigation';

function ComponentForCheckAuth() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, router, loading]);

  return <></>;
}

export default ComponentForCheckAuth;
