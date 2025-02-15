import { responseApi } from "../config/respone.js";
import Review from "../models/Review.js";

// Lấy danh sách đánh giá của người dùng
const getReviews = async (req, res) => { 
    const { idUser } = req.params; 

    if (!idUser || idUser.trim() === "") { 
        return responseApi(res, 400, false, "Missing idUser");
    }

    try { 
        const reviews = await Review.find({ user_id: idUser }).populate("user_id", "name email"); 
        return responseApi(res, 200, reviews, "Reviews found", { reviews }); 
    } catch (error) { 
        return responseApi(res, 500, false, error.message);
    }
};

// Gửi đánh giá (tạo mới)
const sentReview = async (req, res) => { 
    const { product_id, user_id } = req.params; 
    const { rating, comment } = req.body;

    if (!product_id) { 
         responseApi(res, 400, false, "Not found ID Product");
         return
    }

    if (!user_id) { 
         responseApi(res, 400, false, "Not found ID User");
         return;
    }

    if (!rating || !comment) { 
         responseApi(res, 400, false, "Rating & Comment are required");
         return;
    }

    try {

        const newReview = new Review({
        product_id,
              user_id,
            rating,
            comment
        });

        await newReview.save();
         responseApi(res, 201, newReview  , "Review created successfully", { newReview });
         return

    } catch (error) {
         responseApi(res, 500, false, error.message);
         return
    }
};

// Xoá đánh giá theo ID
const removeReview = async (req, res) => {
    const { idReview } = req.params;

    if (!idReview) {
         responseApi(res, 400, false, "Missing review ID");
         return
    }

    try {
        const deletedReview = await Review.findByIdAndDelete(idReview);

        if (!deletedReview) {
             responseApi(res, 404, false, "Review not found");
             return
        }

         responseApi(res, 200, deletedReview, "Review deleted successfully");
        return
    } catch (error) {
         responseApi(res, 500, false, error.message);
         return
    }
};
const updateReview = async (req, res) => { 
const { idReview } = req.params;
const {rating , comment} = req.body;
if (!idReview) {
 responseApi(res, 400, false, "Missing review ID");
 return; 
}
if (!rating || !comment) {
 responseApi(res, 400, false, "Rating & Comment are required");
 return; 
}
try {
const updateReview = await Review.findByIdAndUpdate(idReview, { rating, comment }, { new: true,runValidators:true });
responseApi(res, 200, updateReview, "Review updated successfully", { updateReview });
}catch(error) {
    responseApi(res, 500, false, error.message);
    return;     
}
if (!idReview) {
 responseApi(res, 400, false, "Missing review ID");
 return; 
 } 
} 

export {updateReview, getReviews, sentReview, removeReview };
