'use client';

import { type ReactNode } from 'react';
import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

type TRefreshWraper = {
  children: ReactNode;
};

export const RefreshWraper = ({ children }: TRefreshWraper) => {
  const pathname = usePathname();
  const { push } = useRouter();

  
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated'&& pathname === '/auth') {
      push('/orders');
    }
    if (status === 'unauthenticated'&& pathname !== '/auth') {
      push('/auth');
    }
  }, [pathname, session, status]);

  return <>{children}</>;
};
