"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationController = exports.updateNotificationController = exports.getNotificationByIdController = exports.getAllNotificationsController = exports.createNotificationController = exports.getNotificationCount = void 0;
const notification_1 = require("../models/notification");
const __1 = require("..");
const db_1 = __importDefault(require("../config/db"));
// import { io } from '..';
function isError(error) {
    return error instanceof Error;
}
const getNotificationCount = async () => {
    try {
        const [rows] = await db_1.default.query('SELECT COUNT(*) AS count FROM notifications');
        // Check if rows is not empty and return the count
        return rows[0]?.count ?? 0; // Use optional chaining and default value
    }
    catch (error) {
        console.error('Error fetching notification count:', error);
        throw new Error('Could not fetch notification count');
    }
};
exports.getNotificationCount = getNotificationCount;
const createNotificationController = async (req, res) => {
    const { title, description, url, userId } = req.body;
    try {
        const notification = await (0, notification_1.createNotification)({
            title,
            description,
            url,
            userId,
        });
        // Fetch the updated count of notifications
        const notificationCount = await (0, exports.getNotificationCount)();
        // Emit the new notification and the updated count to all clients
        __1.io.emit('newNotification', {
            notification,
            count: notificationCount, // Send the total count
        });
        res.status(201).send({ message: 'Notification created successfully', notification, count: notificationCount });
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.createNotificationController = createNotificationController;
const getAllNotificationsController = async (req, res) => {
    try {
        const notifications = await (0, notification_1.getAllNotifications)();
        res.status(200).send(notifications);
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.getAllNotificationsController = getAllNotificationsController;
const getNotificationByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await (0, notification_1.getNotificationById)(id);
        if (notification) {
            res.status(200).send(notification);
        }
        else {
            res.status(404).send({ message: 'Notification not found' });
        }
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.getNotificationByIdController = getNotificationByIdController;
const updateNotificationController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedNotification = await (0, notification_1.updateNotification)(id, data);
        if (updatedNotification) {
            res.status(200).send(updatedNotification);
        }
        else {
            res.status(404).send({ message: 'Notification not found' });
        }
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.updateNotificationController = updateNotificationController;
const deleteNotificationController = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await (0, notification_1.deleteNotification)(id);
        if (deleted) {
            res.status(204).send(); // No content
        }
        else {
            res.status(404).send({ message: 'Notification not found' });
        }
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error occurred' });
        }
    }
};
exports.deleteNotificationController = deleteNotificationController;
