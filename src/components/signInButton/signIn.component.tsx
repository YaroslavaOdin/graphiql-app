import React from 'react';
import { Button } from '../ui/button';
import { Locale } from '../../../i18n.config';
import { usePathname, useRouter } from 'next/navigation';
import { redirectToRightRoute } from '../../utils/functionHelpers';

interface SignInProps {
  lang: Locale;
  text: string;
}

function SignIn({ lang, text }: SignInProps) {
  const pathname = usePathname();
  const arrayPathname = pathname.split('/');
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={() => redirectToRightRoute(arrayPathname, `${lang}/logIn`, router)}
    >
      {text}
    </Button>
  );
}

export default SignIn;
