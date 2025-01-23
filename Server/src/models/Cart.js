import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',  // Liên kết với bảng người dùng (User)
      required: true
    },
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',  // Liên kết với bảng sản phẩm (Product)
          required: true
        },
        name: { type: String, required: true },
        selectedSize: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        totalPrice: { type: Number, required: true, min: 0 }
      }
    ],
    totalQuantity: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  {
    timestamps: true  // Tự động thêm trường createdAt và updatedAt
  }
);

export default mongoose.model('Order', orderSchema);
