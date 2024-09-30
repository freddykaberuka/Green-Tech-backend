"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.updateNotification = exports.getNotificationById = exports.getAllNotifications = exports.createNotification = void 0;
const db_1 = __importDefault(require("../config/db"));
// CRUD Operations
// Create a new notification
const createNotification = async (data) => {
    const { title, description, url, userId } = data;
    const [result] = await db_1.default.query(`INSERT INTO Notifications (title, description, url, userId, \`read\`, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, [title, description, url, userId, false]);
    const createdNotification = {
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
exports.createNotification = createNotification;
// Get all notifications
const getAllNotifications = async () => {
    const [rows] = await db_1.default.query(`SELECT * FROM Notifications`);
    const notifications = rows.map((row) => ({
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
exports.getAllNotifications = getAllNotifications;
// Get a notification by ID
const getNotificationById = async (id) => {
    const [rows] = await db_1.default.query(`SELECT * FROM Notifications WHERE id = ?`, [id]);
    if (rows.length === 0) {
        return null;
    }
    const notification = {
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
exports.getNotificationById = getNotificationById;
// Update a notification
const updateNotification = async (id, data) => {
    const { title, description, url, read } = data;
    const [result] = await db_1.default.query(`UPDATE Notifications SET title = ?, description = ?, url = ?, read = ?, updatedAt = NOW() WHERE id = ?`, [title, description, url, read, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    const updatedNotification = await (0, exports.getNotificationById)(id);
    return updatedNotification;
};
exports.updateNotification = updateNotification;
// Delete a notification
const deleteNotification = async (id) => {
    const [result] = await db_1.default.query(`DELETE FROM Notifications WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};
exports.deleteNotification = deleteNotification;
