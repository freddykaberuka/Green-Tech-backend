"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("../controllers/notificationController");
const router = (0, express_1.Router)();
// Create a new notification
router.post('/', notificationController_1.createNotificationController);
// Get all notifications
router.get('/', notificationController_1.getAllNotificationsController);
// Get a notification by ID
router.get('/:id', notificationController_1.getNotificationByIdController);
// Update a notification
router.put('/:id', notificationController_1.updateNotificationController);
// Delete a notification
router.delete('/:id', notificationController_1.deleteNotificationController);
exports.default = router;
