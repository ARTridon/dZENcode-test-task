'use client';

import { type FC, type ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import { queryClient } from '@/lib/queryClient';
import { store } from '@/redux/store';

type TPropviderWrapperProps = {
  children: ReactNode;
};

export const ProvidersWrapper: FC<TPropviderWrapperProps> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};
