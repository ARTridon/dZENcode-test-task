'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  authValidationSchema,
  typeAuthValidationSchema,
} from '@/types/authType';
import { Button } from '@/ui/Button';

const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeAuthValidationSchema>({
    resolver: zodResolver(authValidationSchema),
  });

  const onSubmit: SubmitHandler<typeAuthValidationSchema> = (data) => {
    signIn('credentials', {
      redirect: true,
      ...data,
    });
  };

  return (
    <section className='h-screen flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-6 rounded shadow-md w-80 mx-auto'
      >
        <input
          type='text'
          placeholder='Email'
          className='w-full px-3 py-2 border rounded'
          {...register('identifier', { required: true })}
        />
        {errors.identifier && (
          <span className='text-red-500 text-xs mt-1'>
            This field is required
          </span>
        )}

        <input
          type='password'
          placeholder='Password'
          className='w-full mt-4 px-3 py-2 border rounded'
          {...register('password', { required: true })}
        />
        {errors.password && (
          <span className='text-red-500 text-xs mt-1'>
            This field is required
          </span>
        )}

        <Button
          className='w-full mt-4 bg-blue-600/80 text-white hover:bg-blue-600'
          type='submit'
        >
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default AuthPage;
