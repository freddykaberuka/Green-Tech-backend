import express from 'express';
import authRoutes from './routes/authRoutes';
import coldroomRoutes from './routes/coldroomRoutes';
import bookingRoutes from './routes/bookingRoutes';
import notificationRoutes from './routes/notificationsRoutes'
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));

app.use('/',(req, res)=>{
  res.send("Welcome To Green Energy Tech")});
app.use('/api/auth', authRoutes);
app.use('/coldroom', coldroomRoutes)
app.use('/book', bookingRoutes)
app.use('/notifications', notificationRoutes)


export default app;
