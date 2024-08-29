'use client';

import React, { useState, createContext, ReactNode, useRef } from 'react';
import { useDropdownMenu } from '@/_hooks/ui/useDropdown';

// Dropdown Context 생성
const DropdownContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
} | null>(null);

// Dropdown 루트 컴포넌트
const Dropdown = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className='relative inline-block text-left'>{children}</div>
    </DropdownContext.Provider>
  );
};

// DropdownTrigger 컴포넌트
const DropdownTrigger = ({ children }: { children: ReactNode }) => {
  const { toggle } = useDropdownMenu();

  return React.cloneElement(children as React.ReactElement, {
    onClick: toggle,
  });
};

// DropdownList 컴포넌트
const DropdownList = ({
  children,
  align = 'start',
}: {
  children: ReactNode;
  align?: 'start' | 'end';
}) => {
  const { isOpen, close } = useDropdownMenu();
  const contentRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부를 클릭했을 때 닫기 위한 이벤트 핸들러
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  return isOpen ? (
    <div
      ref={contentRef}
      className={`absolute z-50 mt-2 min-w-[9rem] rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-200 transform ${
        align === 'end' ? 'right-0' : 'left-0'
      }`}
      onClick={close} // 메뉴 아이템 클릭 시 메뉴를 닫기 위해 사용
    >
      {children}
    </div>
  ) : null;
};

// DropdownItem 컴포넌트
const DropdownItem = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const { close } = useDropdownMenu();

  return (
    <button
      className={`w-full flex items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors duration-150 ease-in-out ${className}`}
      onClick={() => {
        if (onClick) onClick();
        close();
      }}
    >
      {children}
    </button>
  );
};

export {
  DropdownContext,
  Dropdown,
  DropdownTrigger,
  DropdownList,
  DropdownItem,
};
