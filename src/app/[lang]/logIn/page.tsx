'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchemaSignIn,
  validationSchemaTypeSignIn,
} from '../../../utils/validationSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { auth } from '../../../utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Locale } from '../../../../i18n.config';
import { useGetTextByLangQuery } from '../../../store/reducers/apiLanguageSlice';
import ProgressPassword from '../../../components/progressPassword/progressPassword.component';

interface LogInProps {
  params: { lang: Locale };
}

export default function LogIn({ params: { lang } }: LogInProps): JSX.Element {
  const form = useForm<validationSchemaTypeSignIn>({
    resolver: yupResolver(validationSchemaSignIn),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { data } = useGetTextByLangQuery(lang);
  const [signInUser, , , error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const password = form.watch('password');

  useEffect(() => {
    if (error) {
      form.setError('email', { type: 'server', message: error?.message });
    }
  }, [error, form]);

  const onSubmit: SubmitHandler<validationSchemaTypeSignIn> = async data => {
    const { email, password } = data;
    try {
      const userCredential = await signInUser(email, password);
      const user = userCredential?.user;

      if (user) {
        router.push('/');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  return (
    <Form {...form}>
      <div className="flex justify-center mt-[150px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="m-0 w-[300px]">
                <FormLabel>{data?.page.register.password}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    placeholder={data?.page.register.placeholderPassword}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message || (
                    <span className="invisible">&nbsp;</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormLabel>{data?.page.register.email}</FormLabel>
                <ProgressPassword password={password} />
                <FormControl>
                  <Input
                    type="email"
                    placeholder={data?.page.register.placeholderEmail}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message || (
                    <span className="invisible">&nbsp;</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">{data?.page.register.submit}</Button>
        </form>
      </div>
    </Form>
  );
}
