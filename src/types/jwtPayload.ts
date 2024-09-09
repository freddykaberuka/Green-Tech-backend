export interface JWTPayload {
    userId: number;  // Ensure this matches your userId
    role: 'admin' | 'user';
    iat: number;
    exp: number;
  }
  