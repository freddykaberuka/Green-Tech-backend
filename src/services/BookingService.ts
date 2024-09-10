import { Booking, createBooking, updateBookingStatus, getBookingsByUserId, getBookingById, cancelBooking, getAllBookings, getPendingBookings } from '../models/Booking';

export class BookingService {
  async requestBooking(userId: number, coldRoomId: number): Promise<number> {
    const bookingId = await createBooking({
      userId,
      coldRoomId,
      status: 'pending',
      requestedAt: new Date(),
    });
    return bookingId;
  }

  async approveBooking(id: number, status: 'approved' | 'rejected') {
    await updateBookingStatus(id, status);
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return getBookingsByUserId(userId);
  }

  async getAllBookings(): Promise<Booking[]> {
    return getAllBookings();
  }

  async getBookingById(id: number): Promise<Booking | null> {
    return getBookingById(id);
  }

  async cancelBooking(id: number): Promise<void> {
    return cancelBooking(id);
  }

  async getPendingBookings(): Promise<Booking[]> {
    return getPendingBookings();
  }
}
