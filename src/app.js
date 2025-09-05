// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import purifierRoutes from './routes/purifierRoutes.js';
import developerPurifierRoutes from './routes/developerPurifierRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authenticate, authorize } from './middlewares/auth.js';
import { removeHeaders, errorHandler } from './middlewares/header_ErrorHandler.js';
import { connectDB } from './config/db.js';

import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.disable('x-powered-by');
app.set('etag', false);

app.use(removeHeaders);

// Correct CORS configuration (only one instance)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Protect admin/application APIs
app.use('/api/purifiers', authenticate, authorize(['admin']), purifierRoutes);
app.use('/api/dev/purifiers', developerPurifierRoutes);

// User page APIs
app.use('/api/user', userRoutes);

// Test route
app.get('/', (req, res) => res.send('Ping successful. DOR-Server responded'));

// Error handling middleware
app.use(errorHandler);

export default app;