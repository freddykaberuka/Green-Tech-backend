import express from 'express';
import authRoutes from './routes/authRoutes';
import coldroomRoutes from './routes/coldroomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import notificationRoutes from './routes/notificationsRoutes'
import contactRoutes from './routes/contactRoutes'
import paymentRoutes from './routes/paymentRoutes';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://green-energy-tech.vercel.app', credentials: true }));


app.use('/api/auth', authRoutes);
app.use('/coldroom', coldroomRoutes)
app.use('/book', bookingRoutes)
app.use('/notifications', notificationRoutes)
app.use('/contact', contactRoutes)
app.use('/api/payment', paymentRoutes);


export default app;
