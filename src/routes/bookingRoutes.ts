import { Router } from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController';
import { authenticateJWT, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/book', authenticateJWT, createBooking); // User can book a cold room
router.get('/bookings', [authenticateJWT, adminMiddleware], getBookings); // Admin can see all bookings
router.patch('/bookings/:id', [authenticateJWT, adminMiddleware], updateBookingStatus); // Admin can approve/reject a booking

export default router;
