'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchemaRegister,
  validationSchemaTypeRegister,
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
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import { Locale } from '../../../../i18n.config';
import { useGetTextByLangQuery } from '../../../store/reducers/apiLanguageSlice';
import ProgressPassword from '../../../components/progressPassword/progressPassword.component';

interface RegisterProps {
  params: { lang: Locale };
}

export default function Register({ params: { lang } }: RegisterProps): JSX.Element {
  const form = useForm<validationSchemaTypeRegister>({
    resolver: yupResolver(validationSchemaRegister),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { data } = useGetTextByLangQuery(lang);
  const [createUser, , , error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const password = form.watch('password');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) router.push('/');
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (error) {
      form.setError('email', { type: 'server', message: error?.message });
    }
  }, [error, form]);

  const onSubmit: SubmitHandler<validationSchemaTypeRegister> = async data => {
    const { email, username, password } = data;
    try {
      const userCredential = await createUser(email, password);
      const user = userCredential?.user;
      if (user) {
        updateProfile(user, { displayName: username });
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
            name="username"
            render={({ field }) => (
              <FormItem className="m-0 w-[300px]">
                <FormLabel>{data?.page.register.username}</FormLabel>
                <FormControl>
                  <Input placeholder={data?.page.register.placeholderUsername} {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.username?.message || (
                    <span className="invisible">&nbsp;</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormLabel>{data?.page.register.password}</FormLabel>
                <ProgressPassword password={password} />
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
                <FormControl>
                  <Input
                    className="m-0"
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
