import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    phonenumber: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true, // Mongoose sẽ tự động thêm createdAt và updatedAt
  }
);

export default mongoose.model('Company', companySchema);
