import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Define your Booking interface
export interface Booking {
  id?: number;
  userId: number;
  coldRoomId: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  approvedAt?: Date;
  startDate: Date;
  endDate: Date; 
}

// Create a booking
export const createBooking = async (booking: Booking): Promise<number> => {
  try {
    const query = `INSERT INTO bookings (userId, coldRoomId, status, requestedAt, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      booking.userId,
      booking.coldRoomId,
      booking.status,
      booking.requestedAt,
      booking.startDate,
      booking.endDate
    ]);
    return result.insertId;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Database error: Could not create booking.");
  }
};

// Update booking status
export const updateBookingStatus = async (id: number, status: string): Promise<void> => {
  const query = `UPDATE bookings SET status = ?, approvedAt = ? WHERE id = ?`;
  await pool.execute(query, [status, new Date(), id]);
};

// Get bookings by user ID
export const getBookingsByUserId = async (userId: number): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE userId = ?`;
  const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);
  return rows as Booking[];
};

// Get booking by ID
export const getBookingById = async (id: number): Promise<Booking | null> => {
  const query = `SELECT * FROM bookings WHERE id = ?`;
  const [rows] = await pool.query<RowDataPacket[]>(query, [id]);
  return (rows as Booking[])[0] || null;
};

// Cancel booking
export const cancelBooking = async (id: number): Promise<void> => {
  const query = `DELETE FROM bookings WHERE id = ?`;
  await pool.execute(query, [id]);
};

// Get all bookings with coldroom and user information
export const getAllBookings = async (): Promise<any[]> => {
  const query = `
    SELECT 
      bookings.id AS bookingId,
      bookings.status,
      bookings.requestedAt,
      bookings.approvedAt,
      bookings.startDate,
      bookings.endDate,
      users.id AS userId,
      users.names AS userName,
      users.email AS userEmail,
      cold_rooms.id AS coldRoomId,
      cold_rooms.name AS coldRoomName,
      cold_rooms.location AS coldRoomLocation
    FROM bookings
    JOIN users ON bookings.userId = users.id
    JOIN cold_rooms ON bookings.coldRoomId = cold_rooms.id;
  `;
  
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows;
};


// Get pending bookings
export const getPendingBookings = async (): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE status = 'pending'`;
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows as Booking[];
};

export const checkDateAvailability = async (coldRoomId: number, startDate: Date, endDate: Date): Promise<boolean> => {
  // Convert dates to SQL format (YYYY-MM-DD HH:MM:SS)
  const startDateStr = startDate.toISOString().slice(0, 19).replace('T', ' ');
  const endDateStr = endDate.toISOString().slice(0, 19).replace('T', ' ');

  const query = `
    SELECT * FROM bookings
    WHERE coldRoomId = ?
    AND status = 'approved'
    AND (
      (startDate <= ? AND endDate >= ?)  -- The requested range overlaps an existing booking (start within range or end within range)
      OR (startDate <= ? AND endDate >= ?)
      OR (startDate >= ? AND endDate <= ?) -- The requested range completely encloses an existing booking
    )
  `;
  
  const [rows] = await pool.query<RowDataPacket[]>(query, [
    coldRoomId, endDateStr, startDateStr, startDateStr, endDateStr, startDateStr, endDateStr
  ]);
  return rows.length === 0;
};
  
  

  
  
