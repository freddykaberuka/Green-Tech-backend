import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export interface Notification {
  id: string;
  title: string;
  description: string;
  url?: string;
  userId: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// CRUD Operations

// Create a new notification
export const createNotification = async (data: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Notification> => {
  const { title, description, url, userId } = data;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO Notifications (title, description, url, userId, \`read\`, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [title, description, url, userId, false]
  );

  const createdNotification: Notification = {
    id: result.insertId.toString(),
    title,
    description,
    url,
    userId,
    read: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return createdNotification;
};

// Get all notifications
export const getAllNotifications = async (): Promise<Notification[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM Notifications`);
  
  const notifications: Notification[] = rows.map((row: RowDataPacket) => ({
    id: row.id.toString(),
    title: row.title,
    description: row.description,
    url: row.url,
    userId: row.userId.toString(),
    read: !!row.read,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt)
  }));

  return notifications;
};

// Get a notification by ID
export const getNotificationById = async (id: string): Promise<Notification | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM Notifications WHERE id = ?`, [id]);
  
  if (rows.length === 0) {
    return null;
  }

  const notification: Notification = {
    id: rows[0].id.toString(),
    title: rows[0].title,
    description: rows[0].description,
    url: rows[0].url,
    userId: rows[0].userId.toString(),
    read: !!rows[0].read,
    createdAt: new Date(rows[0].createdAt),
    updatedAt: new Date(rows[0].updatedAt)
  };

  return notification;
};

// Update a notification
export const updateNotification = async (id: string, data: Partial<Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Notification | null> => {
  const { title, description, url, read } = data;

  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE Notifications SET title = ?, description = ?, url = ?, read = ?, updatedAt = NOW() WHERE id = ?`,
    [title, description, url, read, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const updatedNotification = await getNotificationById(id);
  return updatedNotification;
};

// Delete a notification
export const deleteNotification = async (id: string): Promise<boolean> => {
  const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Notifications WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};
