import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Locale } from '../../../i18n.config';

interface SignInProps {
  lang: Locale;
  text: string;
}

function SignIn({ lang, text }: SignInProps) {
  return (
    <Button variant="link" asChild>
      <Link href={`${lang}/logIn`}>{text}</Link>
    </Button>
  );
}

export default SignIn;
