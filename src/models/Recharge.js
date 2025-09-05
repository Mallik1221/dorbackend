import mongoose from 'mongoose';

const RechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purifierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Purifier', required: true },
  amount: { type: Number, required: true },
  rechargeDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true } // when the subscription ends
}, { timestamps: true });

export default mongoose.model('Recharge', RechargeSchema);
