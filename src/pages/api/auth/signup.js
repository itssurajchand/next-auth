// pages/api/auth/signup.js

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(process.env.MONGODB_DB);
  const usersCollection = db.collection('users');

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: 'User already exists' });
    client.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ email, password: hashedPassword });

  client.close();
  res.status(201).json({ message: 'User created' });
};

export default handler;
