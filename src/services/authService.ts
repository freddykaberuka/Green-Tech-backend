import { findUserByEmail, createUser } from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';

export const register = async (email: string, password: string, role: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error('User already exists');
  }
  const hashedPassword = await hashPassword(password);
  await createUser(email, hashedPassword);
};

export const login = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
  
    return user;
  };
  
