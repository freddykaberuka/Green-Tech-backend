"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// Use the same port for both HTTP and WebSocket
const PORT = process.env.PORT || 3000;
// Create the HTTP server
const server = (0, http_1.createServer)(app_1.default);
// Set up Socket.IO with the server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || '*',
        methods: ["GET", "POST"],
    },
});
exports.io = io;
// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('New WebSocket connection established');
    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        io.emit('message', msg);
    });
    socket.on('newNotification', (data) => {
        console.log('New notification received:', data);
        io.emit('bookingUpdate', { message: 'New booking received!', data });
        io.emit('newNotification', { message: 'A new booking has been created!', data });
    });
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
