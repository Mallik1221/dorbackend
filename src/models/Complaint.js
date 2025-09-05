import mongoose from 'mongoose';

const ComplaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purifierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Purifier', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'resolved', 'rejected'], default: 'pending' },
  raisedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model('Complaint', ComplaintSchema);
