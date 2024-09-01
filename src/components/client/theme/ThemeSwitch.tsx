'use client';

import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownTrigger,
} from '@/components/client/ui/Dropdown';
import { LucideIcon, Dot, Monitor, Moon, Sun } from 'lucide-react';

interface DropdownItemProps {
  newTheme: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  useEffect(() => {
    setMounted(true);

    // theme 쿠키 확인
    const themeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme'))
      ?.split('=')[1];

    if (themeCookie) {
      setCurrentTheme(themeCookie);
      if (themeCookie === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (themeCookie === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // 시스템 테마 반영
        const systemPrefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      }
    } else {
      // 쿠키가 없을 때 기본으로 light 모드로 설정
      document.cookie = `theme=light; path=/;`;
      document.documentElement.classList.remove('dark');
    }

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const prefersDark = e.matches;
      document.cookie = `darkMode=${prefersDark ? 'true' : 'false'}; path=/;`;
      document.documentElement.classList.toggle('dark', prefersDark);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleSystemThemeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const handleSetTheme = (newTheme: string) => {
    setCurrentTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/;`;

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  };

  const ThemeItem = ({ newTheme, Icon, label }: DropdownItemProps) => (
    <DropdownItem onClick={() => handleSetTheme(newTheme)}>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Icon width={14} />
          {label}
        </div>
        {currentTheme === newTheme && <Dot className='text-end' />}
      </div>
    </DropdownItem>
  );

  if (!mounted) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className='flex p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600'>
          {currentTheme === 'light' ? (
            <Sun className='h-4 w-4' />
          ) : currentTheme === 'dark' ? (
            <Moon className='h-4 w-4' />
          ) : (
            <Monitor className='h-4 w-4' />
          )}
        </button>
      </DropdownTrigger>
      <DropdownList align='end'>
        <ThemeItem newTheme='light' label='Light' Icon={Sun} />
        <ThemeItem newTheme='dark' label='Dark' Icon={Moon} />
        <ThemeItem newTheme='system' label='System' Icon={Monitor} />
      </DropdownList>
    </Dropdown>
  );
};

export default ThemeSwitch;
