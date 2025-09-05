import User from '../models/User.js';
import Purifier from '../models/Purifier.js';
import Recharge from '../models/Recharge.js';
import Complaint from '../models/Complaint.js';


/**
 * GET /api/user/me
 * Returns basic user info
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role
    });
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ message: 'Failed to get user data', error: err.message });
  }
};

/**
 * GET /api/user/dashboard
 * Returns all assigned purifiers for the logged-in user
 */
export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.sub;

    // Fetch user with assigned purifiers
    const user = await User.findById(userId).populate({
      path: 'assignedPurifiers',
      select: 'id name status onlineStatus lastUpdated lastOnline location'
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Map purifiers to clean structure
    const purifiers = user.assignedPurifiers.map(p => ({
      id: p.id,
      name: p.name,
      location: p.location,
      status: p.status,
      onlineStatus: p.onlineStatus,
      lastUpdated: p.lastUpdated,
      lastOnline: p.lastOnline
    }));

    res.json(purifiers);
  } catch (err) {
    console.error('Error in /dashboard:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
};


/**
 * GET /api/user/recharge
 * Returns subscription/recharge info for assigned purifiers
 */
export const getRechargeInfo = async (req, res) => {
  try {
    const userId = req.user.sub;

    // Get assigned purifiers
    const user = await User.findById(userId).populate({
      path: 'assignedPurifiers',
      select: 'id name'
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const purifiers = user.assignedPurifiers;

    // For each purifier, get last recharge info
    const rechargeData = await Promise.all(
      purifiers.map(async p => {
        const lastRecharge = await Recharge.findOne({ userId, purifierId: p._id })
          .sort({ expiryDate: -1 }) // most recent
          .lean();

        return {
          purifierId: p.id,
          purifierName: p.name,
          subscriptionActive: lastRecharge ? lastRecharge.expiryDate > new Date() : false,
          subscriptionExpiry: lastRecharge ? lastRecharge.expiryDate : null,
          lastRechargeAmount: lastRecharge ? lastRecharge.amount : null,
          lastRechargeDate: lastRecharge ? lastRecharge.rechargeDate : null
        };
      })
    );

    res.json(rechargeData);
  } catch (err) {
    console.error('Error in /recharge:', err);
    res.status(500).json({ message: 'Failed to fetch recharge info', error: err.message });
  }
};


/**
 * GET /api/user/complaints
 * Returns all complaints submitted by the logged-in user
 */
export const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user.sub;

    const complaints = await Complaint.find({ userId })
      .populate({ path: 'purifierId', select: 'id name' })
      .sort({ raisedAt: -1 })
      .lean();

    // Map to frontend-friendly structure
    const data = complaints.map(c => ({
      complaintId: c._id,
      purifierId: c.purifierId ? c.purifierId.id : null,
      purifierName: c.purifierId ? c.purifierId.name : null,
      title: c.title,
      description: c.description,
      status: c.status,
      raisedAt: c.raisedAt,
      resolvedAt: c.resolvedAt || null
    }));

    res.json(data);
  } catch (err) {
    console.error('Error in /complaints:', err);
    res.status(500).json({ message: 'Failed to fetch complaints', error: err.message });
  }
};
