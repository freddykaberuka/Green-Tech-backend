import pool from '../config/db';

export interface Booking {
  id?: number;
  userId: number;
  coldRoomId: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  approvedAt?: Date;
}

export const createBooking = async (booking: Booking): Promise<number> => {
  const query = `INSERT INTO bookings (userId, coldRoomId, status, requestedAt) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.execute(query, [
    booking.userId,
    booking.coldRoomId,
    booking.status,
    booking.requestedAt,
  ]);
  return (result as any).insertId;
};

export const updateBookingStatus = async (id: number, status: string): Promise<void> => {
  const query = `UPDATE bookings SET status = ?, approvedAt = ? WHERE id = ?`;
  await pool.execute(query, [status, new Date(), id]);
};

export const getBookingsByUserId = async (userId: number): Promise<Booking[]> => {
  const query = `SELECT * FROM bookings WHERE userId = ?`;
  const [rows] = await pool.query(query, [userId]);
  return rows as Booking[];
};
