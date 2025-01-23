import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImportNoteSchema = new Schema(
  {
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",  // Liên kết với bảng 'Supplier'
      required: true,
    },
    noteCode: {
      type: String,
      required: true,
      unique: true,  // Đảm bảo rằng mã ghi chú là duy nhất trong hệ thống
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",  // Liên kết với bảng 'User', người tạo ghi chú
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,  // Mặc định là 0, sẽ được cập nhật khi có thông tin về tổng số tiền
    },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Completed"],  // Trạng thái của ghi chú (Chờ, Hủy, Hoàn thành)
      default: "Pending",  // Mặc định là "Pending"
    },
    notes: {
      type: String,  // Thông tin bổ sung về ghi chú
    },
  },
  {
    timestamps: true,  // Tự động thêm trường createdAt và updatedAt
  }
);

// Khai báo ảo (virtual) để kết nối với bảng ImportNoteDetail
ImportNoteSchema.virtual('importNoteDetail', {
  ref: 'ImportNoteDetail',  // Liên kết với bảng 'ImportNoteDetail'
  localField: '_id',  // Trường '_id' trong bảng ImportNote
  foreignField: 'importNoteId',  // Trường 'importNoteId' trong bảng ImportNoteDetail
});

// Cấu hình để virtuals được bao gồm trong kết quả trả về khi chuyển đối tượng sang JSON hoặc Object
ImportNoteSchema.set('toObject', { virtuals: true });
ImportNoteSchema.set('toJSON', { virtuals: true });

export default  mongoose.model("ImportNote", ImportNoteSchema);
