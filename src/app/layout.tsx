import { Inter } from 'next/font/google';

import { ProvidersWrapper } from '@/components/ProvidersWrapper';
import { RefreshWraper } from '@/components/RefreshWraper';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ProvidersWrapper>
          <RefreshWraper>{children} </RefreshWraper>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
