import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import Header from '@/components/server/common/Header';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Obbli Community',
  description: 'Welcome to Obbli Community',
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const themeHeader = headers().get('OS-Theme');
  const isDarkMode = themeHeader === 'dark';
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className={isDarkMode ? 'dark' : ''}>
      <body className='bg-theme text-theme'>
        <Header session={session} />
        <main className='mt-[64px]'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
