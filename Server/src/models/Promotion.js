import mongoose from 'mongoose';

const { Schema } = mongoose;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Applied', 'Active', 'Expired'],
    default: 'Not Applied',
  },
}, { 
  timestamps: true,
});

export default mongoose.model('Promotion', promotionSchema);
