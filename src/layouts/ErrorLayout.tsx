'use client';

import Button from '@/components/server/ui/Button';

const ErrorLayout = () => {
  return (
    <div className='flex min-h-[50rem] flex-col items-center justify-center'>
      <h1 className='text-4xl'>{'404 - Page Not Found'}</h1>
      <p className='py-5'>{'해당 주소의 페이지는 없습니다.'}</p>
      <Button onClick={() => history.back()} size='lg'>
        <p>{'뒤로가기'}</p>
      </Button>
    </div>
  );
};

export default ErrorLayout;
