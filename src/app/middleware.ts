// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const darkModeCookie = request.cookies.get('darkMode')?.value;

  const response = NextResponse.next();

  if (darkModeCookie === 'true') {
    response.headers.set('OS-Dark-Mode', 'true');
  } else {
    response.headers.set('OS-Dark-Mode', 'false');
  }

  return response;
}

export const config = {
  matcher: '/', // 모든 경로에 대해 middleware를 적용합니다.
};
