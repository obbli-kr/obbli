'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginKey, setLoginKey] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login?username=${username}&password=${password}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      if (data.success) {
        alert('로그인 성공!');
        // 여기에서 로그인 성공 후 처리
      } else {
        alert('로그인 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='h-[85vh] grid grid-cols-2 items-center gap-10'>
      <div className='flex justify-end'>
        <form onSubmit={handleSubmit} className='space-y-3 w-64'>
          <h1 className='text-2xl font-bold my-4 text-center'>로그인</h1>
          <div>
            <label htmlFor='username' className='block text-gray-700'>
              아이디
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-orange-300'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-gray-700'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-orange-300'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300'
          >
            로그인
          </button>
          <div className='flex justify-center mt-2 gap-5'>
            <a href='#' className='text-gray-500'>
              아이디/비밀번호 찾기
            </a>
            <a href='#' className='text-gray-700'>
              회원가입
            </a>
          </div>
        </form>
      </div>
      {/* 아마도 Next-Auth 라이브러리 사용해야..? */}
      <div className='w-64 h-[300px] flex flex-col'>
        <p className='flex justify-center items-end h-12'>혹은 간편로그인</p>
        <div className='grid grid-rows-3 gap-5 mt-12'>
          <button
            onClick={() =>
              window.open(
                'https://accounts.google.com/',
                '',
                'width=500, height=500'
              )
            }
            className='ml-2 p-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300'
          >
            <p>Google</p>
          </button>
          <button
            onClick={() =>
              window.open(
                'https://nid.naver.com/nidlogin.login?mode=form',
                '',
                'width=500, height=500'
              )
            }
            className='ml-2 p-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300'
          >
            <p>Naver</p>
          </button>
          <button
            onClick={() =>
              window.open(
                'https://accounts.kakao.com/',
                '',
                'width=500, height=500'
              )
            }
            className='ml-2 p-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300'
          >
            <p>Kakao</p>
          </button>
        </div>
      </div>
    </div>
  );
}
