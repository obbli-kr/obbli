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
  currentTheme: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('system');

  useEffect(() => {
    setMounted(true);

    const themeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme'))
      ?.split('=')[1];

    if (themeCookie) {
      setCurrentTheme(themeCookie);
    }

    const darkModeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('darkMode'))
      ?.split('=')[1];

    if (darkModeCookie === 'true') {
      document.documentElement.classList.add('dark');
    } else {
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

  const ThemeItem = ({ currentTheme, Icon, label }: DropdownItemProps) => (
    <DropdownItem onClick={() => handleSetTheme(currentTheme)}>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Icon width={14} />
          {label}
        </div>
        {currentTheme === currentTheme && <Dot className='text-end' />}
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
        <ThemeItem currentTheme='light' label='Light' Icon={Sun} />
        <ThemeItem currentTheme='dark' label='Dark' Icon={Moon} />
        <ThemeItem currentTheme='system' label='System' Icon={Monitor} />
      </DropdownList>
    </Dropdown>
  );
};

export default ThemeSwitch;
