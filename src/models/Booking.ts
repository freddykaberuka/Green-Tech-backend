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
  const query = `INSERT INTO bookings (userId, coldRoomId, status, requestedAt, startDate, endDate) VALUES (?, ?, ?, ?, ?,?)`;
  const [result] = await pool.execute<ResultSetHeader>(query, [
    booking.userId,
    booking.coldRoomId,
    booking.status,
    booking.requestedAt,
    booking.startDate,
    booking.endDate
  ]);
  return result.insertId;
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

// Get all bookings
export const getAllBookings = async (): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings`;
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows as Booking[];
};

// Get pending bookings
export const getPendingBookings = async (): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE status = 'pending'`;
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows as Booking[];
};

export const checkDateAvailability = async (coldRoomId: number, startDate: Date, endDate: Date): Promise<boolean> => {
    // Convert dates to proper SQL format
    const startDateStr = startDate.toISOString().slice(0, 19).replace('T', ' ');
    const endDateStr = endDate.toISOString().slice(0, 19).replace('T', ' ');
  
    const query = `
      SELECT * FROM bookings
      WHERE coldRoomId = ?
      AND status = 'approved'
      AND (
        (startDate <= ? AND endDate >= ?) OR  -- Booking overlaps with the start of the requested range
        (startDate <= ? AND endDate >= ?) OR  -- Booking overlaps with the end of the requested range
        (startDate >= ? AND endDate <= ?)     -- Booking is fully within the requested range
      )
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [
      coldRoomId, startDateStr, startDateStr, endDateStr, endDateStr, startDateStr, endDateStr
    ]);
  
    console.log('Date check result:', rows); // Debugging log
  
    return rows.length === 0;  // If no conflicting bookings, room is available
  };
  
  

  
  
