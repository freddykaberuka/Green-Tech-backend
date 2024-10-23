import { Booking, createBooking, updateBookingStatus, getBookingsByUserId, getBookingById, cancelBooking, getAllBookings, getPendingBookings, checkDateAvailability } from '../models/Booking';

export class BookingService {
  async isDateAvailable(coldRoomId: number, startDate: Date, endDate: Date): Promise<boolean> {
    try {
      return await checkDateAvailability(coldRoomId, startDate, endDate);
    } catch (error) {
      console.error("Error checking date availability:", error);
      throw new Error("Database error: Could not check date availability.");
    }
  }
  async requestBooking(userId: number, coldRoomId: number, startDate: Date, endDate: Date, totalPrice: number): Promise<number> {
    console.log('Requested Dates:', { startDate, endDate, totalPrice });
    
    const bookingId = await createBooking({
      userId,
      coldRoomId,
      status: 'pending',
      requestedAt: new Date(),
      startDate,
      endDate,
      totalPrice,
    });
    return bookingId;
  }


  async approveBooking(id: number, status: 'approved' | 'rejected') {
    await updateBookingStatus(id, status);
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return getBookingsByUserId(userId);
  }

  async getAllBookings(): Promise<any[]> {
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

  async checkDateAvailability(coldRoomId: number, startDate: Date, endDate: Date): Promise<boolean> {
    return checkDateAvailability(coldRoomId, startDate, endDate);
  }
}
