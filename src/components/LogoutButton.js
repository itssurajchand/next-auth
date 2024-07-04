import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LogoutButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: '/' }); // Redirect to home page after logout
    router.push('/auth/signin'); // Redirect to login page after logout
  };

  if (session) {
    return <button onClick={handleLogout}>Logout</button>;
  }
  return null;
}
