'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const authValidationSchema = z.object({
  identifier: z.string().email({
    message: 'Please enter a valid email',
  }),
  password: z
    .string()
    .nonempty({
      message: 'Please enter a password',
    })
    .min(8, {
      message: 'Password must be at least 8 characters',
    }),
});

type typeAuthValidationSchema  =z.infer<typeof authValidationSchema>

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

        <button
          className='mt-6 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-full'
          type='submit'
        >
          Sign In
        </button>
      </form>
    </section>
  );
};

export default AuthPage;
