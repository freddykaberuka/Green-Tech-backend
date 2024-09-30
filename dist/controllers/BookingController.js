"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const BookingService_1 = require("../services/BookingService");
const notificationController_1 = require("./notificationController");
const bookingService = new BookingService_1.BookingService();
class BookingController {
    async requestBooking(req, res) {
        try {
            const { coldRoomId, startDate, endDate } = req.body;
            const userId = req.user?.userId;
            if (!userId)
                return res.status(403).json({ message: 'Unauthorized, user ID missing' });
            // Parse the startDate and endDate to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Ensure the dates are valid
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({ message: 'Invalid date format' });
            }
            console.log('Requested Dates:', { startDate: start.toISOString(), endDate: end.toISOString() });
            const bookingId = await bookingService.requestBooking(userId, coldRoomId, start, end);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const readableStart = start.toLocaleString('en-US', options);
            const readableEnd = end.toLocaleString('en-US', options);
            const notificationData = {
                title: 'Booking Confirmed',
                description: `Your booking for Cold Room ID ${coldRoomId} from ${readableStart} to ${readableEnd} has been confirmed.`,
                url: `/bookings/${bookingId}`, // Link to the booking details page
                userId,
            };
            // Create mock request and response objects
            const mockReq = {
                body: notificationData,
            };
            const mockRes = {
                status: (code) => {
                    return {
                        send: (responseBody) => {
                            // You can log or handle the response if needed
                            console.log(`Response Status: ${code}`, responseBody);
                        },
                    };
                },
            };
            // Call the existing notification controller
            await (0, notificationController_1.createNotificationController)(mockReq, mockRes);
            res.status(201).json({ message: 'Booking request submitted', id: bookingId });
        }
        catch (error) {
            console.error('Error submitting booking request:', error); // Log the error
            res.status(500).json({ error: 'Failed to submit booking request' });
        }
    }
    async updateBookingStatus(req, res) {
        try {
            const { id, status } = req.body;
            if (req.user?.role !== 'admin')
                return res.status(403).json({ message: 'Forbidden, admin access required' });
            await bookingService.approveBooking(id, status);
            res.status(200).json({ message: `Booking status updated to ${status}` });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update booking status' });
        }
    }
    async getUserBookings(req, res) {
        try {
            const userId = req.user?.userId; // Access userId instead of id
            if (!userId)
                return res.status(403).json({ message: 'Unauthorized, user ID missing' });
            const bookings = await bookingService.getUserBookings(userId);
            res.status(200).json(bookings);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    }
    async getAllBookings(req, res) {
        try {
            if (req.user?.role !== 'admin')
                return res.status(403).json({ message: 'Forbidden, admin access required' });
            const bookings = await bookingService.getAllBookings();
            res.status(200).json(bookings);
        }
        catch (error) {
            console.error('Error retrieving all bookings:', error); // Log the error
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    }
    async getBookingDetails(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.userId;
            // Check if id is a valid number
            const bookingId = Number(id);
            if (isNaN(bookingId)) {
                return res.status(400).json({ message: 'Invalid booking ID' });
            }
            const booking = await bookingService.getBookingById(bookingId);
            if (!booking)
                return res.status(404).json({ message: 'Booking not found' });
            if (booking.userId !== userId && req.user?.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden, you are not authorized to view this booking' });
            }
            res.status(200).json(booking);
        }
        catch (error) {
            console.error('Error retrieving booking details:', error); // Log the error
            res.status(500).json({ error: 'Failed to retrieve booking details' });
        }
    }
    async cancelBooking(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.userId;
            const booking = await bookingService.getBookingById(Number(id));
            if (!booking)
                return res.status(404).json({ message: 'Booking not found' });
            if (booking.userId !== userId) {
                return res.status(403).json({ message: 'Forbidden, you are not authorized to cancel this booking' });
            }
            await bookingService.cancelBooking(Number(id));
            res.status(200).json({ message: 'Booking cancelled successfully' });
        }
        catch (error) {
            console.error('Error cancelling booking:', error); // Log the error
            res.status(500).json({ error: 'Failed to cancel booking' });
        }
    }
    async getPendingBookings(req, res) {
        try {
            if (req.user?.role !== 'admin')
                return res.status(403).json({ message: 'Forbidden, admin access required' });
            const bookings = await bookingService.getPendingBookings();
            res.status(200).json(bookings);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve pending bookings' });
        }
    }
    async checkAvailability(req, res) {
        try {
            const { coldRoomId, startDate, endDate } = req.body;
            if (!coldRoomId || !startDate || !endDate) {
                return res.status(400).json({ message: 'coldRoomId, startDate, and endDate are required' });
            }
            const start = new Date(startDate);
            const end = new Date(endDate);
            // Ensure the dates are valid
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({ message: 'Invalid date format' });
            }
            const isAvailable = await bookingService.checkDateAvailability(coldRoomId, start, end);
            if (isAvailable) {
                res.status(200).json({ message: 'Cold room is available' });
            }
            else {
                res.status(409).json({ message: 'Cold room is not available for the selected dates' });
            }
        }
        catch (error) {
            console.error('Error checking availability:', error);
            res.status(500).json({ error: 'Failed to check availability' });
        }
    }
}
exports.BookingController = BookingController;
