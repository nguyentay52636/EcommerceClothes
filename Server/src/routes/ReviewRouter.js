import express from 'express' ; 
import { getReviews, removeReview, sentReview ,updateReview} from '../controller/ReviewController.js';
const router = express.Router();

router.get('/get-review-by-user/:idUser?/',getReviews)  ; 
router.post('/sent-review/:user_id?/:product_id?',sentReview) ;
router.delete('/remove-review/:idReview',removeReview);
router.put('/update-review/:idReview',updateReview);
export default router ;
