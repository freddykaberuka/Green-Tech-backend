import db from '../config/db';

export interface Booking {
  id: number;
  userId: number;
  coldRoomId: number;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string; // Add a createdAt field
}

// Create a new booking
export const createBooking = async (booking: Partial<Booking>): Promise<number> => {
  const { userId, coldRoomId, startTime, endTime } = booking;
  const query = `
    INSERT INTO bookings (userId, coldRoomId, startTime, endTime, status, createdAt)
    VALUES (?, ?, ?, ?, 'pending', NOW())
  `;
  const [result]: any = await db.query(query, [userId, coldRoomId, startTime, endTime]);
  return result.insertId;
};

// Get a booking by ID
export const getBookingById = async (id: number): Promise<Booking | null> => {
  const query = `SELECT * FROM bookings WHERE id = ?`;
  const [rows]: any = await db.query(query, [id]);
  return rows.length ? rows[0] : null;
};

// Get bookings by status (pending, approved, rejected)
export const getBookingsByStatus = async (status: string): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE status = ? ORDER BY createdAt DESC`;
  const [rows]: any = await db.query(query, [status]);
  return rows;
};

// Update the booking status (for admin approval/rejection)
export const updateBookingStatus = async (id: number, status: 'approved' | 'rejected'): Promise<void> => {
  const query = `UPDATE bookings SET status = ?, updatedAt = NOW() WHERE id = ?`;
  await db.query(query, [status, id]);
};

// Get all bookings for a specific user
export const getBookingsByUser = async (userId: number): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE userId = ? ORDER BY createdAt DESC`;
  const [rows]: any = await db.query(query, [userId]);
  return rows;
};
