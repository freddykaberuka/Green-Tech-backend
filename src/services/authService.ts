import { findUserByEmail, createUser, updateUserPassword, storePasswordResetToken, getPasswordResetToken } from '../models/User';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { sendResetEmail } from '../utils/email';
import crypto from 'crypto'

export const register = async (names: string, email: string, password: string, role: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new Error('User already exists');
  }
  const hashedPassword = await hashPassword(password);
  await createUser(names, email, hashedPassword, role);
};

export const login = async (names: string, email: string, password: string) => {
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

  export const requestPasswordReset = async (email: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
  
    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate a token
    await storePasswordResetToken(user.id, resetToken); // Store the token in the DB
    
    await sendResetEmail(email, resetToken); // Send an email with the reset link
  };

  export const resetPassword = async (token: string, newPassword: string) => {
    const resetTokenData = await getPasswordResetToken(token);
  
    if (!resetTokenData || !('id' in resetTokenData)) {
      throw new Error('Invalid or expired token');
    }
  
    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(resetTokenData.id, hashedPassword);
  
    return { message: 'Password reset successful' };
  };
  
  
  
  
