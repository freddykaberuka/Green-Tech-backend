// routes/bookingRoutes.ts
import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const bookingController = new BookingController();

router.post('/', authenticateJWT, bookingController.requestBooking);  // User booking request
router.put('/status', authenticateJWT, bookingController.updateBookingStatus);  // Admin updates status
router.get('/list', authenticateJWT, bookingController.getUserBookings);  // Get user's bookings

export default router;
