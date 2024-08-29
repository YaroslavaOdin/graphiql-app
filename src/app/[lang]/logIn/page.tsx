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

export default function Register(): JSX.Element {
  const form = useForm<validationSchemaTypeSignIn>({
    resolver: yupResolver(validationSchemaSignIn),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [signInUser, , , error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  console.log(error);
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
      console.log(userCredential);
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    type="password"
                    placeholder="type your password"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="type your email" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message || (
                    <span className="invisible">&nbsp;</span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
}
