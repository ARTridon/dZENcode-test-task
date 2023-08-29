import { type ReactNode } from 'react';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { type NextPage } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/authConfig';

type TRefreshWraper = {
  children: ReactNode;
};

const refresh = async () => {
  const authPath = headers().get('x-invoke-path') === '/auth';

  const session = await getServerSession(authOptions);
  // if (!session && !authPath) {
  //   redirect('/auth');
  // }
  // if (session && authPath) {
  //   redirect('/orders');
  // }
};

export const RefreshWraper: NextPage<TRefreshWraper> = async ({ children }) => {
  await refresh();

  return <>{children}</>;
};
