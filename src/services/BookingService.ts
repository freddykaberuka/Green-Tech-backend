// services/bookingService.ts
import { Booking, createBooking, updateBookingStatus, getBookingsByUserId } from '../models/Booking';

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
}
