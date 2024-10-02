'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${ process.env.NEXT_PUBLIC_API_URL }/api/login?username=${ username }&password=${ password }`,
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
    <div className="grid h-[85vh] items-center justify-center sm:grid-cols-2 sm:gap-10">
      <div className="flex justify-end">
        <form onSubmit={handleSubmit} className="w-64 space-y-3">
          <h1 className="text-theme my-4 text-center text-2xl font-bold">
            {'로그인'}
          </h1>
          <div>
            <label htmlFor="username" className="block">
              {'아이디'}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border p-2 focus:border-orange-300 focus:outline-none focus:ring"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              {'비밀번호'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border p-2 focus:border-orange-300 focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
          >
            {'로그인'}
          </button>
          <div className="mt-2 flex justify-center gap-5">
            <a href="#" className="text-gray-500">
              {'아이디/비밀번호 찾기'}
            </a>
            <a href="#">{'회원가입'}</a>
          </div>
        </form>
      </div>
      {/* 아마도 Next-Auth 라이브러리 사용해야..? */}
      <div className="flex h-[300px] w-64 flex-col">
        <p className="flex h-12 items-end justify-center">
          {'혹은 간편로그인'}
        </p>
        <div className="mt-12 grid grid-rows-3 gap-5">
          <button
            onClick={() =>
              window.open(
                'https://accounts.google.com/',
                '',
                'width=500, height=500'
              )
            }
            className="ml-2 rounded-md border p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300"
          >
            <p>{'Google'}</p>
          </button>
          <button
            onClick={() =>
              window.open(
                'https://nid.naver.com/nidlogin.login?mode=form',
                '',
                'width=500, height=500'
              )
            }
            className="ml-2 rounded-md border p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300"
          >
            <p>{'Naver'}</p>
          </button>
          <button
            onClick={() =>
              window.open(
                'https://accounts.kakao.com/',
                '',
                'width=500, height=500'
              )
            }
            className="ml-2 rounded-md border p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300"
          >
            <p>{'Kakao'}</p>
          </button>
          <button
            onClick={() => signIn('github')}
            className="ml-2 rounded-md border p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-orange-300"
          >
            <p>{'Github'}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
