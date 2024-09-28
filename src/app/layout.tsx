import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/server/common/Header';
import Footer from '@/components/server/common/Footer';
import { cookies } from 'next/dist/client/components/headers';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Obbli Community',
  description: 'Welcome to Obbli Community',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const themeCookieName = process.env.NEXT_PUBLIC_THEME_COOKIE_NAME || '';
  const themeCookie = cookies().get(themeCookieName)?.value;

  return (
    <html lang='en' className={themeCookie === 'light' ? '' : 'dark'}>
      <body className='bg-theme text-theme'>
        <Header />
        <main className='mt-[64px]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
