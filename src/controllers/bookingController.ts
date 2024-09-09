import { Request, Response } from 'express';
import { CustomRequest } from '../types/customRequest';
import { BookingService } from '../services/BookingService';

const bookingService = new BookingService();

export class BookingController {
  async requestBooking(req: CustomRequest, res: Response) {
    try {
      const { coldRoomId } = req.body;
      const userId = req.user?.userId;  // Access userId instead of id
      if (!userId) return res.status(403).json({ message: 'Unauthorized, user ID missing' });

      const bookingId = await bookingService.requestBooking(userId, coldRoomId);
      res.status(201).json({ message: 'Booking request submitted', id: bookingId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit booking request' });
    }
  }

  async updateBookingStatus(req: CustomRequest, res: Response) {
    try {
      const { id, status } = req.body;
      if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden, admin access required' });

      await bookingService.approveBooking(id, status);
      res.status(200).json({ message: `Booking status updated to ${status}` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  }

  async getUserBookings(req: CustomRequest, res: Response) {
    try {
      const userId = req.user?.userId;  // Access userId instead of id
      if (!userId) return res.status(403).json({ message: 'Unauthorized, user ID missing' });

      const bookings = await bookingService.getUserBookings(userId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
  }
}
