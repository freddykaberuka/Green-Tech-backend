import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const bookingController = new BookingController();

router.post('/', authenticateJWT, bookingController.requestBooking);  // User booking request
router.put('/status', authenticateJWT, bookingController.updateBookingStatus);  // Admin updates status
router.get('/list', authenticateJWT, bookingController.getUserBookings);  // Get user's bookings
router.get('/pending', authenticateJWT, bookingController.getPendingBookings);  // Admin gets pending bookings
router.post('/availability', bookingController.checkAvailability); 
router.get('/', authenticateJWT, bookingController.getAllBookings);  // Admin gets all bookings
router.get('/:id', authenticateJWT, bookingController.getBookingDetails);  // Get booking details by ID
router.delete('/:id', authenticateJWT, bookingController.cancelBooking);  // User cancels booking



export default router;
