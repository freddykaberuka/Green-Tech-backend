import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { bookingService } from '../services/BookingService';

export const createBooking = async (req: Request, res: Response) => {
    const { coldRoomId, startTime, endTime } = req.body;
    const userId = req.user?.id; // Ensure req.user exists
  
    try {
      const newBooking: Omit<Booking, 'id'> = {
        userId,
        coldRoomId,
        startTime: new Date(startTime), // Ensure it's a Date
        endTime: new Date(endTime),     // Ensure it's a Date
      };
  
      const booking = await bookingService.createBooking(newBooking);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error });
    }
  };

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // 'Approved' or 'Rejected'

  try {
    const updatedBooking = await bookingService.updateBookingStatus(Number(id), status);
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error });
  }
};
