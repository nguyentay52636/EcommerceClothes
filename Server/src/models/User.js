import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    default: null,
  },
  accountStatus: {
    type: String,
    enum: ["active", "block"],
    default: "active",
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
