import { Request } from 'express';
import { JWTPayload } from './jwtPayload';

export interface CustomRequest extends Request {
  user?: JWTPayload;
}
