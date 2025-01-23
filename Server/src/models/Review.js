import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review_id: {
    type: String,
    required: true,
    unique: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
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
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;