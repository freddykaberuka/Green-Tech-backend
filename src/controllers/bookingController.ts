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

  async getAllBookings(req: CustomRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden, admin access required' });
  
      const bookings = await bookingService.getAllBookings();
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error retrieving all bookings:', error); // Log the error
      res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
  }

  async getBookingDetails(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
  
      // Check if id is a valid number
      const bookingId = Number(id);
      if (isNaN(bookingId)) {
        return res.status(400).json({ message: 'Invalid booking ID' });
      }
  
      const booking = await bookingService.getBookingById(bookingId);
  
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      if (booking.userId !== userId && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden, you are not authorized to view this booking' });
      }
  
      res.status(200).json(booking);
    } catch (error) {
      console.error('Error retrieving booking details:', error); // Log the error
      res.status(500).json({ error: 'Failed to retrieve booking details' });
    }
  }
  

  async cancelBooking(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
  
      const booking = await bookingService.getBookingById(Number(id));
  
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      if (booking.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden, you are not authorized to cancel this booking' });
      }
  
      await bookingService.cancelBooking(Number(id));
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling booking:', error); // Log the error
      res.status(500).json({ error: 'Failed to cancel booking' });
    }
  }
  
  async getPendingBookings(req: CustomRequest, res: Response) {
    try {
      if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden, admin access required' });
  
      const bookings = await bookingService.getPendingBookings();
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve pending bookings' });
    }
  }
  
  
}
