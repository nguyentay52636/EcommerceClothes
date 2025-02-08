import express from 'express';
import {updateMoneytaryNorm,updateLoyaltyDiscount, getLoyaltyDiscounts,getMoneytaryNorm,createLoyaltyDiscount,deleteLoyaltyDiscount } from '../controller/LoyaltyDiscountController.js';
const router = express.Router() ; 
router.get('/get-loyalty-discount',getLoyaltyDiscounts) 
router.get('/get-moneytary-norm',getMoneytaryNorm)
router.post('/create-loyalty-discount',createLoyaltyDiscount)
router.delete('/delete-loyalty-discount/:idLoyaltyDiscount?',deleteLoyaltyDiscount)
router.put('/update-loyalty-discount/:idLoyaltyDiscount',updateLoyaltyDiscount)
router.put('/update-moneytary-norm',updateMoneytaryNorm) 
export default router;