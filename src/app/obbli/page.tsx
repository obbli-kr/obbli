import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';

const ObbliPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>{'Obbli Page'}</h1>
      {session ? (
        <div>
          <p>{'Welcome,'} {session.user?.name}</p>
          <p>{session.user?.email}</p>
          <Image src={session.user?.image || '/default-image.png'} alt={session.user?.name || 'User'} width={100} height={100} />
        </div>
      ) : (
        <p>{'You are not logged in'}</p>
      )}
    </div>
  );
};

export default ObbliPage;
