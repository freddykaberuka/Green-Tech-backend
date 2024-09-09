export interface JWTPayload {
    id: number;
    email: string;
    role: 'admin' | 'user';
  }
  