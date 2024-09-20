import { Router } from 'express';
import { createNotificationController, deleteNotificationController, getAllNotificationsController, getNotificationByIdController, updateNotificationController } from '../controllers/notificationController';

const router = Router();

// Create a new notification
router.post('/', createNotificationController);

// Get all notifications
router.get('/', getAllNotificationsController);

// Get a notification by ID
router.get('/:id', getNotificationByIdController);

// Update a notification
router.put('/:id', updateNotificationController);

// Delete a notification
router.delete('/:id', deleteNotificationController);

export default router;