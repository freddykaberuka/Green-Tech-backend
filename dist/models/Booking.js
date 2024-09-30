"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDateAvailability = exports.getPendingBookings = exports.getAllBookings = exports.cancelBooking = exports.getBookingById = exports.getBookingsByUserId = exports.updateBookingStatus = exports.createBooking = void 0;
const db_1 = __importDefault(require("../config/db"));
// Create a booking
const createBooking = async (booking) => {
    const query = `INSERT INTO bookings (userId, coldRoomId, status, requestedAt, startDate, endDate) VALUES (?, ?, ?, ?, ?,?)`;
    const [result] = await db_1.default.execute(query, [
        booking.userId,
        booking.coldRoomId,
        booking.status,
        booking.requestedAt,
        booking.startDate,
        booking.endDate
    ]);
    return result.insertId;
};
exports.createBooking = createBooking;
// Update booking status
const updateBookingStatus = async (id, status) => {
    const query = `UPDATE bookings SET status = ?, approvedAt = ? WHERE id = ?`;
    await db_1.default.execute(query, [status, new Date(), id]);
};
exports.updateBookingStatus = updateBookingStatus;
// Get bookings by user ID
const getBookingsByUserId = async (userId) => {
    const query = `SELECT * FROM bookings WHERE userId = ?`;
    const [rows] = await db_1.default.query(query, [userId]);
    return rows;
};
exports.getBookingsByUserId = getBookingsByUserId;
// Get booking by ID
const getBookingById = async (id) => {
    const query = `SELECT * FROM bookings WHERE id = ?`;
    const [rows] = await db_1.default.query(query, [id]);
    return rows[0] || null;
};
exports.getBookingById = getBookingById;
// Cancel booking
const cancelBooking = async (id) => {
    const query = `DELETE FROM bookings WHERE id = ?`;
    await db_1.default.execute(query, [id]);
};
exports.cancelBooking = cancelBooking;
// Get all bookings with coldroom and user information
const getAllBookings = async () => {
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
    const [rows] = await db_1.default.query(query);
    return rows;
};
exports.getAllBookings = getAllBookings;
// Get pending bookings
const getPendingBookings = async () => {
    const query = `SELECT * FROM bookings WHERE status = 'pending'`;
    const [rows] = await db_1.default.query(query);
    return rows;
};
exports.getPendingBookings = getPendingBookings;
const checkDateAvailability = async (coldRoomId, startDate, endDate) => {
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
    const [rows] = await db_1.default.query(query, [
        coldRoomId, endDateStr, startDateStr, startDateStr, endDateStr, startDateStr, endDateStr
    ]);
    return rows.length === 0;
};
exports.checkDateAvailability = checkDateAvailability;
