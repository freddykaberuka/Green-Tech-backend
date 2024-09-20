import { Request, Response } from 'express';
import { createNotification, deleteNotification, getAllNotifications, getNotificationById, updateNotification } from '../models/notification';
import { io } from '..';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';
// import { io } from '..';

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const getNotificationCount = async (): Promise<number> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) AS count FROM notifications');

    // Check if rows is not empty and return the count
    return rows[0]?.count ?? 0; // Use optional chaining and default value
  } catch (error) {
    console.error('Error fetching notification count:', error);
    throw new Error('Could not fetch notification count');
  }
};

  export const createNotificationController = async (req: Request, res: Response) => {
    const { title, description, url, userId } = req.body;

    try {
      const notification = await createNotification({
        title,
        description,
        url,
        userId,
      });

      // Fetch the updated count of notifications
      const notificationCount = await getNotificationCount();

      // Emit the new notification and the updated count to all clients
      io.emit('newNotification', {
        notification,
        count: notificationCount, // Send the total count
      });

      res.status(201).send({ message: 'Notification created successfully', notification, count: notificationCount });
    } catch (error) {
      if (isError(error)) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Unknown error occurred' });
      }
    }
  };

export const getAllNotificationsController = async (req: Request, res: Response) => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).send(notifications);
  } catch (error) {
    if (isError(error)) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
  }
};

export const getNotificationByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notification = await getNotificationById(id);
    if (notification) {
      res.status(200).send(notification);
    } else {
      res.status(404).send({ message: 'Notification not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
  }
};

export const updateNotificationController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedNotification = await updateNotification(id, data);
    if (updatedNotification) {
      res.status(200).send(updatedNotification);
    } else {
      res.status(404).send({ message: 'Notification not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
  }
};

export const deleteNotificationController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await deleteNotification(id);
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).send({ message: 'Notification not found' });
    }
  } catch (error) {
    if (isError(error)) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
  }
};