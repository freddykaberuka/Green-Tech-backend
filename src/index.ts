import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Use the same port for both HTTP and WebSocket
const PORT = process.env.PORT || 3000;

// Create the HTTP server
const server = createServer(app);

// Set up Socket.IO with the server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ["GET", "POST"],
  },
});

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

// Export the Socket.IO instance
export { io };