"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const momoServices_1 = __importDefault(require("../services/momoServices"));
const BookingService_1 = require("../services/BookingService");
const index_1 = require("../index"); // Import WebSocket instance to notify clients
const router = express_1.default.Router();
const bookingService = new BookingService_1.BookingService();
// Initiate payment route
router.post('/pay', async (req, res) => {
    const { phone, bookingId, amount } = req.body;
    if (!phone || !bookingId || !amount) {
        return res.status(400).json({ error: 'Phone number, booking ID, and amount are required' });
    }
    try {
        // Ensure booking exists and is approved
        const booking = await bookingService.getBookingById(bookingId);
        if (!booking || booking.status !== 'approved') {
            return res.status(400).json({ error: 'Booking not found or not approved' });
        }
        // Initiate payment via MoMo Pay
        const transactionId = await momoServices_1.default.initiatePayment(phone, amount);
        // Notify the client via WebSocket
        index_1.io.emit('paymentInitiated', { bookingId, transactionId });
        res.json({ transactionId, message: 'Payment initiated successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || 'Payment initiation failed' });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.default = router;
