import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, unique: true, match: /^\d{10}$/ },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  assignedPurifiers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purifier' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);


