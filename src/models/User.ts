import pool from '../config/db';

export interface User {
  id: number;
  names: string;
  email: string;
  password: string;
  role: 'admin'|'user';
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as User;
  }
  return null;
};

export const createUser = async (names: string, email: string, hashedPassword: string, role: string): Promise<void> => {
  await pool.query('INSERT INTO users (names, email, password, role) VALUES (?, ?, ?, ?)', [names, email, hashedPassword, role]);
};

export const storePasswordResetToken = async (userId: number, token: string) => {
  await pool.query(
    `UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?`, 
    [token, Date.now() + 3600000, userId] // Token expires in 1 hour
  );
};

export const getPasswordResetToken = async (token: string) => {
  const [rows] = await pool.query(
    `SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > ?`,
    [token, Date.now()]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0]; // Assuming you expect a single user object with an id
  }
  return null;
};


export const updateUserPassword = async (userId: number, hashedPassword: string) => {
  const [result] = await pool.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [hashedPassword, userId]
  );
  return result;
};
