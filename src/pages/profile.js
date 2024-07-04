// pages/profile.js

import LogoutButton from '@/components/LogoutButton';
import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(status,'status123',session)
    if (status === 'authenticated') {
      // Fetch user data
      fetch('/api/user')
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          {/* Render other user data here */}
          <LogoutButton/>
        </div>
      )}
    </div>
  );
}
