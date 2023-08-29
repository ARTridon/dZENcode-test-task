// @ts-nocheck
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { Api } from '@/graphQl';
import { queryClient } from '@/lib/queryClient';

const { NEXTAUTH_SECRET } = process.env;

interface LoginResponse {
  jwt: string;
  user: {
    email: string;
    id: string;
  };
  id: string;
}

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
      // @ts-ignore
      async authorize(
        credentials: { identifier: string; password: string } | null
      ): Promise<null | { jwt: string; email: string }> {
        if (!credentials) return null;

        try {
          const { identifier, password } = credentials;
          const { login }: { login: LoginResponse } =
            await queryClient.fetchQuery(['login'], () =>
              Api.auth.login({ identifier, password })
            );

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
