// @ts-nocheck
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authAction } from '@/hooks/server-actions';
import { TLoginResponse, typeAuthValidationSchema } from '@/types/authType';

const { NEXTAUTH_SECRET } = process.env;

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      id: string;
    };
    id: string;
    jwt: string;
  }
  interface User {
    email: string;
    jwt: string;
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: typeAuthValidationSchema | null
      ): Promise<null | { jwt: string; email: string }> {
        if (!credentials) return null;

        try {
          const { identifier, password } = credentials;
          const {
            login,
          }: {
            login: TLoginResponse;
          } = await authAction({ identifier, password });

          return {
            jwt: login.jwt,
            email: login.user.email,
            id: login.user.id,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: NEXTAUTH_SECRET!,

  session: {
    strategy: 'jwt',
  },
  debug: true,
  callbacks: {
    async session({ session, token }) {
      session.jwt = token.jwt as string;
      session.id = token.id as string;

      return session;
    },
    async jwt({ user, token }) {
      if (user?.jwt) {
        token.jwt = user.jwt;
        token.id = user.id;
      }
      return token;
    },
  },
};
