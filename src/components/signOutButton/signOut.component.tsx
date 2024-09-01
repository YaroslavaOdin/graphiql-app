import React from 'react';
import { Button } from '../ui/button';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebaseConfig';

interface SignOutProps {
  text: string;
}

function SignOut({ text }: SignOutProps) {
  const [out] = useSignOut(auth);
  return (
    <Button variant="secondary" onClick={out}>
      {text}
    </Button>
  );
}

export default SignOut;

