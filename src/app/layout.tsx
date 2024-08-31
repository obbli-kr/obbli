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
  const darkModeHeader = headers().get('OS-Dark-Mode');
  const isDarkMode = darkModeHeader === 'true';
  return (
    <html lang='en' className={isDarkMode ? 'dark' : ''}>
      <body>
        <Header />
        <main className='mt-[64px]'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
