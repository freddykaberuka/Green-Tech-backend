export interface JWTPayload {
    userId: number;
    names: string;
    email: string;
    role: 'admin' | 'user';
    iat: number;
    exp: number;
  }
  