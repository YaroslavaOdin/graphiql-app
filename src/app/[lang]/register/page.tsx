'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema, validationSchemaType } from '../../../utils/validationSchema';
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
import { updateProfile } from 'firebase/auth';

export default function Register(): JSX.Element {
  const form = useForm<validationSchemaType>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const onSubmit: SubmitHandler<validationSchemaType> = async data => {
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
      <div className='flex justify-center mt-[150px]'> 
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="m-0 w-[300px]">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="type your username" {...field} />
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
                {form.formState.errors.username?.message || (
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
                <Input type="email"  placeholder="type your email" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.username?.message || (
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
