import Button from '@/components/server/ui/Button';
import Link from 'next/link';

const Header = () => {
  const navItems = [
    { href: '/obbli', label: '오브리' },
    { href: '/lesson', label: '레슨' },
    { href: '/recruit', label: '채용' },
    { href: '/concert', label: '공연' },
    { href: '/board', label: '게시판' },
  ];

  return (
    <header className='fixed left-0 top-0 w-full bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center'>
        <Link href='/'>
          <h1 className='text-3xl font-bold text-orange-600'>Obbli</h1>
        </Link>
        <div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button size='md'>{item.label}</Button>
            </Link>
          ))}
        </div>
        <Link href='/login'>
          <Button size='md'>로그인</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
