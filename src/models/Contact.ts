import pool from '../config/db';

export interface ContactQuery {
  id: number;
  names: string;
  email: string;
  phone: string;
  question: string;
}

export const createContactQuery = async (names: string, email: string, phone: string, question: string): Promise<void> => {
  await pool.query(
    `INSERT INTO contact_queries (names, email, phone, question) VALUES (?, ?, ?, ?)`,
    [names, email, phone, question]
  );
};
