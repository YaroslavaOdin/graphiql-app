import React from 'react';
import { Button } from '../ui/button';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebaseConfig';

function SignOut() {
  const [out] = useSignOut(auth);
  return (
    <Button variant="secondary" onClick={out}>
      Log out
    </Button>
  );
}

export default SignOut;
