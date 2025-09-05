// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import purifierRoutes from './routes/purifierRoutes.js';
import developerPurifierRoutes from './routes/developerPurifierRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authenticate, authorize } from './middlewares/auth.js';
import { removeHeaders,errorHandler } from './middlewares/header_ErrorHandler.js';
import { connectDB } from './config/db.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.disable('x-powered-by');
app.set('etag', false);

app.use(removeHeaders);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
// Protect admin/application APIs - only admin should manage purifiers
app.use('/api/purifiers', authenticate, authorize(['admin']), purifierRoutes);              // Admin / Application APIs
app.use('/api/dev/purifiers', developerPurifierRoutes); // Developer / IoT APIs

// Test route
app.get('/', (req, res) => res.send('Ping successful. DOR-Server responded'));

// Error handling middleware
app.use(errorHandler);

export default app;
