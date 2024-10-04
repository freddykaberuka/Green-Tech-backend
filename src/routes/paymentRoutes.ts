import express from 'express';
import momoService from '../services/momoServices';
import { BookingService } from '../services/BookingService';
import { io } from '../index'; // Import WebSocket instance to notify clients

const router = express.Router();
const bookingService = new BookingService();

// Initiate payment route
router.post('/pay', async (req, res) => {
    const { phone, bookingId, amount } = req.body;
  
    if (!phone || !bookingId || !amount) {
      return res.status(400).json({ error: 'Phone number, booking ID, and amount are required' });
    }
  
    try {
      // Ensure booking exists and is approved
      const booking = await bookingService.getBookingById(bookingId);
      if (!booking || booking.status !== 'approved') {
        return res.status(400).json({ error: 'Booking not found or not approved' });
      }
  
      // Initiate payment via MoMo Pay
      const transactionId = await momoService.initiatePayment(phone, amount);
  
      // Notify the client via WebSocket
      io.emit('paymentInitiated', { bookingId, transactionId });
  
      res.json({ transactionId, message: 'Payment initiated successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message || 'Payment initiation failed' });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });
  

export default router;
