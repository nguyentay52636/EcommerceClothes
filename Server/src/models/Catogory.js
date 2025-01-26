import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  categoryCode: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Unavailable'],
    default: 'Available',
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

const Category = mongoose.model('Category', categorySchema);

export default Category;
