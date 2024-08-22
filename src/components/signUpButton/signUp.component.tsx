import React from 'react'
import { Button } from '../ui/button';
import  Link  from 'next/link';
import { Locale } from '../../../i18n.config';

interface SignUpProps {
  lang:Locale
  text:string
}

function SignUp({lang,text}:SignUpProps) {

  return (
    <Button variant="link" asChild>
      <Link href={`${lang}/register`}>{text}</Link>
    </Button>
  )
}

export default SignUp;