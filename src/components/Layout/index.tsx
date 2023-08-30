import { type FC } from 'react';

import { NavigationMenu } from '@/components/Layout/NavigationMenu';
import { TopMenu } from '@/components/Layout/TopMenu';

type TLayout = {
  children: React.ReactNode;
};

export const Layout: FC<TLayout> = ({ children }) => {
  return (
    <main className=' overflow-hidden'>
      <TopMenu />
      <div className='flex items-start justify-start gap-4'>
        <NavigationMenu />
        {children}
      </div>
    </main>
  );
};
