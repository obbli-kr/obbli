// 하드코딩된 사용자 정보 (실제 코드에서는 데이터베이스나 외부 인증 서비스를 사용)
const VALID_USERNAME = 'user';
const VALID_PASSWORD = 'password';
// 혹은 간편로그인으로 받은 키
const VALID_LOGIN_KEY = 'login_key';

// 인증 로직을 함수로 분리(성호씨가 더 잘 작성해주실 것 같아요)
function authenticate(
  username: string | null,
  password: string | null,
  loginKey: string | null
): boolean {
  // 인증 로직 예시
  return (
    (username === VALID_USERNAME && password === VALID_PASSWORD)
    || loginKey === VALID_LOGIN_KEY
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const loginKey = searchParams.get('login_key');

  if (authenticate(username, password, loginKey)) {
    return new Response(
      JSON.stringify({ success: true, message: '로그인 성공' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, message: '로그인 실패' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  // 더 많은 케이스들이 있겠죠? 예를 들어, 사용자 정보가 없는 경우, 비밀번호가 틀린 경우 등
}
