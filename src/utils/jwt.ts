import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { userId, role },
    secretKey,
    { expiresIn: '1d' }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
