import express from 'express';
import { createPromotion, deletePromotion, getPromotionByName, getPromotions, updatePromotion } from '../controller/PromotionController.js';
 const router = express.Router();
 router.get('/get-promotions',getPromotions);
 router.post('/create-promotion',createPromotion);
router.delete('/delete-promotion/:idPromotion?',deletePromotion)
router.get('/get-promotion-by-name/:name?',getPromotionByName);
router.put("/update-promotion/:idPromotion?",updatePromotion)
 export default router;
 