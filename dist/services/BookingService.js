"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const Booking_1 = require("../models/Booking");
class BookingService {
    async requestBooking(userId, coldRoomId, startDate, endDate) {
        console.log('Requested Dates:', { startDate, endDate });
        const bookingId = await (0, Booking_1.createBooking)({
            userId,
            coldRoomId,
            status: 'pending',
            requestedAt: new Date(),
            startDate,
            endDate,
        });
        return bookingId;
    }
    async approveBooking(id, status) {
        await (0, Booking_1.updateBookingStatus)(id, status);
    }
    async getUserBookings(userId) {
        return (0, Booking_1.getBookingsByUserId)(userId);
    }
    async getAllBookings() {
        return (0, Booking_1.getAllBookings)();
    }
    async getBookingById(id) {
        return (0, Booking_1.getBookingById)(id);
    }
    async cancelBooking(id) {
        return (0, Booking_1.cancelBooking)(id);
    }
    async getPendingBookings() {
        return (0, Booking_1.getPendingBookings)();
    }
    async checkDateAvailability(coldRoomId, startDate, endDate) {
        return (0, Booking_1.checkDateAvailability)(coldRoomId, startDate, endDate);
    }
}
exports.BookingService = BookingService;
