'use client';

import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownTrigger,
} from '@/components/client/ui/Dropdown';
import { LucideIcon, Dot, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DropdownItemProps {
  currentTheme: string;
  label: string;
  Icon: LucideIcon;
}

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ThemeItem = ({ currentTheme, Icon, label }: DropdownItemProps) => (
    <DropdownItem onClick={() => setTheme(currentTheme)}>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Icon width={14} />
          {label}
        </div>
        {theme === currentTheme && <Dot className='text-end' />}
      </div>
    </DropdownItem>
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* TODO: 버튼 컴포넌트 ui */}
        <button className='flex p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600'>
          {theme === 'light' ? (
            <Sun className='h-4 w-4' />
          ) : theme === 'dark' ? (
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
