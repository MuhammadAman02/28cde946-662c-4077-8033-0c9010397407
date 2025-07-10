import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

// Static users for testing
const STATIC_USERS = [
  { id: '1', email: 'admin@test.com', password: 'admin123' },
  { id: '2', email: 'user@test.com', password: 'user123' },
  { id: '3', email: 'demo@test.com', password: 'demo123' }
];

export async function authenticateUser({ email, password }: { email: string; password: string }) {
  // Find user by email
  const user = STATIC_USERS.find(u => u.email === email);
  
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // For static users, we'll do simple string comparison
  // In real apps, you'd compare hashed passwords
  if (user.password !== password) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate JWT token (optional, but good practice)
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };
}