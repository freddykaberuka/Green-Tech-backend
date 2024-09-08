import { Booking, createBooking, getBookingsByStatus, updateBookingStatus, getBookingById, getBookingsByUser } from '../models/Booking';

class BookingService {
  // Create a new booking
  async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<number> {
    // Call the model's createBooking function
    const bookingId = await createBooking({
      ...booking,
      status: 'pending' // By default, the booking is pending
    });
    return bookingId;
  }
  async getAllBookings(): Promise<Booking[]> {
    const [bookings] = await db.query('SELECT * FROM bookings');
    return bookings;
  }

  // Get all bookings with a specific status (for admin to view pending/approved/rejected)
  async getBookingsByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<Booking[]> {
    return await getBookingsByStatus(status);
  }

  // Update booking status (for admin approval/rejection)
  async updateBookingStatus(id: number, status: 'approved' | 'rejected'): Promise<Booking | null> {
    await updateBookingStatus(id, status);
    return await getBookingById(id); // Return updated booking details
  }

  // Get all bookings for a specific user
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await getBookingsByUser(userId);
  }

  // Get a booking by ID
  async getBookingById(id: number): Promise<Booking | null> {
    return await getBookingById(id);
  }
}

export const bookingService = new BookingService();
