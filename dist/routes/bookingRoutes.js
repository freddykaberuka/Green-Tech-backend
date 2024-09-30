"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const bookingController = new bookingController_1.BookingController();
router.post('/', authMiddleware_1.authenticateJWT, bookingController.requestBooking); // User booking request
router.put('/status', authMiddleware_1.authenticateJWT, bookingController.updateBookingStatus); // Admin updates status
router.get('/list', authMiddleware_1.authenticateJWT, bookingController.getUserBookings); // Get user's bookings
router.get('/pending', authMiddleware_1.authenticateJWT, bookingController.getPendingBookings); // Admin gets pending bookings
router.post('/availability', bookingController.checkAvailability);
router.get('/', authMiddleware_1.authenticateJWT, bookingController.getAllBookings); // Admin gets all bookings
router.get('/:id', authMiddleware_1.authenticateJWT, bookingController.getBookingDetails); // Get booking details by ID
router.delete('/:id', authMiddleware_1.authenticateJWT, bookingController.cancelBooking); // User cancels booking
exports.default = router;
