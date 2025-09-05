import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { getDashboard, getRechargeInfo, getUserComplaints,getMe } from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// User info
router.get('/me', getMe);

// Page-specific APIs
router.get('/dashboard', getDashboard);
router.get('/recharge', getRechargeInfo);
router.get('/complaints', getUserComplaints);

export default router;
