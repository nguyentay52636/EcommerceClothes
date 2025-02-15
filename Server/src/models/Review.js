import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
