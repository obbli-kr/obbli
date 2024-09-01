import type { Metadata } from 'next';
import { headers } from 'next/headers';
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
  const themeHeader = headers().get('OS-Theme');
  const isDarkMode = themeHeader === 'dark';

  return (
    <html lang='en' className={isDarkMode ? 'dark' : ''}>
      <body className='dark:bg-[--background] dark:text-white'>
        <Header />
        <main className='mt-[64px]'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
