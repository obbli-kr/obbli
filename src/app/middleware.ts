import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const themeCookie = request.cookies.get('theme')?.value;
  const response = NextResponse.next();

  if (themeCookie === 'dark') {
    response.headers.set('OS-Theme', 'dark');
  } else if (themeCookie === 'light') {
    response.headers.set('OS-Theme', 'light');
  } else {
    // 쿠키가 없으면 시스템 테마를 기본값으로 설정
    // 이 때, 클라이언트 힌트를 사용하여 사용자 선호 색상 모드를 감지
    const prefersDark =
      request.headers.get('sec-ch-prefers-color-scheme') === 'dark';
    response.headers.set('OS-Theme', prefersDark ? 'dark' : 'light');
  }

  return response;
}

export const config = {
  matcher: '/', // 모든 경로에 대해 middleware 적용
};
