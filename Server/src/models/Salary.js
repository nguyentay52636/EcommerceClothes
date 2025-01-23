import mongoose from 'mongoose';
const { Schema } = mongoose;

const salarySchema = new Schema({
  employee_id: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',  // Giả sử bạn có schema Employee liên kết với bảng lương
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  workDays: {
    type: Number,
    required: true,
  },
  overtimeHours: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  bonuses: {
    type: Number,
    default: 0,
  },
  totalSalary: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;
