import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest } from '../types/customRequest';
import { JWTPayload } from '../types/jwtPayload';

dotenv.config();

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden, invalid token' });
      }
      req.user = decoded as JWTPayload;  // Cast the decoded token to JWTPayload
      next();
    });
  } else {
    res.status(401).json({ message: 'Unauthorized, token missing' });
  }
};
