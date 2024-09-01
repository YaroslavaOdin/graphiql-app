import React from 'react';
import { Button } from '../ui/button';
import { Locale } from '../../../i18n.config';
import { usePathname, useRouter } from 'next/navigation';
import { redirectToRightRoute } from '../../utils/functionHelpers';

interface SignUpProps {
  lang: Locale;
  text: string;
}

function SignUp({ lang, text }: SignUpProps) {
  const pathname = usePathname();
  const arrayPathname = pathname.split('/');
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={() => redirectToRightRoute(arrayPathname, `${lang}/register`, router)}
    >
      {text}
    </Button>
  );
}

export default SignUp;

