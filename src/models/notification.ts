import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Notification {
  id: string;
  title: string;
  description: string;
  url?: string;
  userId: string;
  read: boolean;
}

// CRUD Operations

// Create a new notification
// Create a new notification
export const createNotification = async (data: Omit<Notification, 'id' | 'read'>): Promise<Notification> => {
    const { title, description, url, userId } = data;
    const [result] = await pool.query<any>(
      `INSERT INTO Notifications (title, description, url, userId, \`read\`) VALUES (?, ?, ?, ?, ?)`,
      [title, description, url, userId, false]
    );

    return { id: result.insertId, title, description, url, userId, read: false };
  };

// Get all notifications
export const getAllNotifications = async (): Promise<Notification[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM Notifications`);
  return rows.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    url: row.url,
    userId: row.userId,
    read: row.read,
  }));
};

// Get a notification by ID
export const getNotificationById = async (id: string): Promise<Notification | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM Notifications WHERE id = ?`, [id]);
  return Array.isArray(rows) && rows.length > 0 ? {
    id: rows[0].id,
    title: rows[0].title,
    description: rows[0].description,
    url: rows[0].url,
    userId: rows[0].userId,
    read: rows[0].read,
  } : null;
};

// Update a notification
export const updateNotification = async (id: string, data: Partial<Omit<Notification, 'id'>>): Promise<Notification | null> => {
  const { title, description, url, read } = data;
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE Notifications SET title = ?, description = ?, url = ?, read = ? WHERE id = ?`,
    [title, description, url, read, id]
  );

  return result.affectedRows > 0 ? { id, title: title ?? '', description: description ?? '', url: url ?? '', userId: '', read: read ?? false } : null;
};

// Delete a notification
export const deleteNotification = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Notifications WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};