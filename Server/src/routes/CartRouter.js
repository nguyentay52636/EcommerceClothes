import express from 'express';
const router = express.Router();
import {getCartByUserId} from '../controller/CartController.js';
router.get('/get-cart-by-user-id/:idUser?',getCartByUserId);    
export default router;