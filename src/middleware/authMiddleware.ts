import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
      if (err) {
        return res.status(403).send({ message: 'Forbidden: Invalid token' });
      }

      // Attach the decoded token (user) to the request object
      req.user = {
        id: decoded.id,
        role: decoded.role, // Assuming JWT includes user role (admin/user)
      };
      next();
    });
  } else {
    res.status(401).send({ message: 'Unauthorized: Token missing' });
  }
};

// Middleware to check if the user is an admin
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Access denied: Admins only' });
  }
};
