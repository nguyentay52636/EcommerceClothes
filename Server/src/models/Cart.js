import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: { type: String, required: true },
        selectedSize: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        totalPrice: { type: Number, required: true, min: 0 }
      }
    ],
    totalQuantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 }
  },
  {
    timestamps: true // Tự động thêm createdAt và updatedAt
  }
);

export default mongoose.model('Cart', cartSchema);
