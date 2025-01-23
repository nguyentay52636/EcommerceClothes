import mongoose from 'mongoose';
const { Schema } = mongoose;

const LoyaltyDiscount = new Schema ({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    requiredPoints: {
        type: Number,
        require: true,
    },
    discount: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ['active', 'paused'],
    }
},
{ 
    timestamps: true,
})
export default  mongoose.model("LoyaltyDiscount", LoyaltyDiscount)
