import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImportNoteDetailSchema = new Schema(
  {
    importNoteId: {
      type: Schema.Types.ObjectId,
      ref: "ImportNote", // Tham chiếu đúng tên model
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, 
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Đăng ký model
const ImportNoteDetail = mongoose.model("ImportNoteDetail", ImportNoteDetailSchema);
export default ImportNoteDetail;
