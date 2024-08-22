import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/server/common/Header';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Obbli Community',
  description: 'Welcome to Obbli Community',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Header />
        <main className='mt-[64px]'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
