import pool from '../config/db';

export interface User {
  id: number;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as User;
  }
  return null;
};

export const createUser = async (email: string, hashedPassword: string): Promise<void> => {
  await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
};
