import { getSession } from 'next-auth/react';
import { MongoClient } from 'mongodb';

export default async (req, res) => {
  console.log('Request received:', req.method, req.url);

  const session = await getSession({ req });
  console.log('Session:', session);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(process.env.MONGODB_DB);
  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne({ email: session.user.email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    client.close();
  }
};
