import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  LoyaltyDicountId: {
    type: Schema.Types.ObjectId,
    ref: 'LoyaltyDiscount', 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  __v: {
    type: Number,
    select: false,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
