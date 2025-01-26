import mongoose, { Schema } from 'mongoose';
const MonetaryNorm = new Schema({
    moneyPerPoint: {
        type: Number,
        required: true,
        min: 0,
    },
}, 
{ 
    timestamps: true, 
});

export default mongoose.model("MonetaryNorm", MonetaryNorm);
//connection point customer 
