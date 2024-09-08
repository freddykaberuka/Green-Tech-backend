import express from 'express';
import authRoutes from './routes/authRoutes';
import coldroomRoutes from './routes/coldroomRoutes';
import bookingRoutes from './routes/bookingRoutes'
import { setupSwagger } from './swagger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
setupSwagger(app);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/coldroom', coldroomRoutes)
app.use('/book', bookingRoutes)

export default app;
