import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '@/components/server/ui/Button';

// ThemeSwitch를 클라이언트 컴포넌트로 동적 로딩
const ThemeSwitch = dynamic(
  () => import('@/components/client/theme/ThemeSwitch'),
  { ssr: false }
);

const CollapseMenu = dynamic(
  () => import('@/components/client/common/CollapseMenu'),
  { ssr: false }
);

const Header = () => {
  const navItems = [
    { href: '/obbli', label: '오브리' },
    { href: '/lesson', label: '레슨' },
    { href: '/recruit', label: '채용' },
    { href: '/concert', label: '공연' },
    { href: '/board', label: '게시판' },
  ];

  return (
    <header className='bg-theme fixed left-0 top-0 z-50 w-full shadow'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-600'>{'Obbli'}</h1>
        </Link>
        <div className='hidden sm:block'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button size='md'>{item.label}</Button>
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <div className='hidden sm:block'>
            <ThemeSwitch />
          </div>
          <div className='block sm:hidden'>
            <CollapseMenu />
          </div>
          <Link href='/login'>
            <Button size='md'>{'로그인'}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
