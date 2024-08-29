import { useContext } from 'react';
import { DropdownContext } from '@/components/client/ui/Dropdown';

export const useDropdownMenu = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'useDropdownMenu 훅이 DropdownMenu 컴포넌트 내부에서 사용되지 않았습니다.'
    );
  }
  return context;
};
