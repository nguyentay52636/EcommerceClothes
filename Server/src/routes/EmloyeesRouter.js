import mongoose, { Schema } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,  
  },
  position: {
    type: String,
    enum: ['employee', 'manager', 'director'], 
    default: 'employee',
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['working', 'on leave', 'terminated'], 
    default: 'working',
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

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
