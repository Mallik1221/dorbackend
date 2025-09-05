import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = '7d';

export const login = async (req, res) => {
  try {
    // console.log('Login attempt:', req.body);
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password are required' });
    }

    // console.log('Finding user...');
    const user = await User.findOne({ phoneNumber }).populate('assignedPurifiers');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // console.log('Validating password...');
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // console.log('Generating token...');
    const token = jwt.sign({ sub: user._id, role: user.role, phoneNumber: user.phoneNumber }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // console.log('Login successful');
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        phoneNumber: user.phoneNumber, 
        role: user.role,
        assignedPurifiers: user.assignedPurifiers || []
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).populate('assignedPurifiers');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      role: user.role,
      assignedPurifiers: user.assignedPurifiers
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user data', error: err.message });
  }
};

export const register = async (req, res) => {
  try {
    // console.log('Registration attempt:', req.body);
    const { name, phoneNumber, password, role } = req.body;
    
    if (!name || !phoneNumber || !password) {
      return res.status(400).json({ message: 'Name, phone number and password are required' });
    }
    
    // console.log('Checking if user exists...');
    const exists = await User.findOne({ phoneNumber });
    if (exists) return res.status(409).json({ message: 'Phone number already registered' });
    
    // console.log('Hashing password...');
    const passwordHash = await bcrypt.hash(password, 10);
    
    // console.log('Creating user...');
    const user = await User.create({ 
      name, 
      phoneNumber, 
      passwordHash, 
      role: role && ['admin','user'].includes(role) ? role : 'user' 
    });
    
    // console.log('User created, generating token...');
    const token = jwt.sign({ 
      sub: user._id, 
      role: user.role, 
      phoneNumber: user.phoneNumber 
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    // console.log('Registration successful');
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        phoneNumber: user.phoneNumber, 
        role: user.role,
        assignedPurifiers: user.assignedPurifiers || []
      } 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};