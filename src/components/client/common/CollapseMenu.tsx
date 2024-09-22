'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeSwitch from '../theme/ThemeSwitch';
import Button from '@/components/server/ui/Button';

const CollapseMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const navItems = [
    { href: '/obbli', label: '오브리' },
    { href: '/lesson', label: '레슨' },
    { href: '/recruit', label: '채용' },
    { href: '/concert', label: '공연' },
    { href: '/board', label: '게시판' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className='bg-theme text-theme'>
      <button onClick={toggleMenu} className='flex items-center'>
        <span className='sr-only'>{'메뉴 열기'}</span>
        <Menu className='size-6' />
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
          isOpen ? 'visible opacity-50' : 'invisible opacity-0'
        }`}
        onClick={closeMenu}
      />

      <div
        className={`bg-theme fixed right-0 top-0 z-50 h-full w-[70%] shadow-lg transition-transform duration-300 ${
          isRendered ? (isOpen ? 'translate-x-0' : 'translate-x-full') : 'translate-x-full'
        }`}
      >
        <div className='absolute right-0 top-0 m-5 flex items-center gap-2'>
          <ThemeSwitch />
          <button
            onClick={toggleMenu}
            className='rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-600'
          >
            <X className='size-6' />
          </button>
        </div>
        <div className='mt-10 p-4'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className='text-theme block cursor-pointer px-4 py-2 text-lg'
                onClick={closeMenu}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className='relative bottom-2 flex justify-center'>
          <Link href='/login'>
            <Button size='md' onClick={closeMenu}>
              {'로그인'}
            </Button>
          </Link>
          <Button size='md' onClick={closeMenu}>
            {'회원가입'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollapseMenu;