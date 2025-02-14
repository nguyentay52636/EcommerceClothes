import express from 'express';
const router = express.Router();
import {getCartByUserId,createProductCart,removeProductFromCart, clearCart} from '../controller/CartController.js';
router.get('/get-cart-by-user-id/:idUser?',getCartByUserId);   // ok 
//test createProductCart
router.post('/add-product-cart/:idUser?/:idProduct?',createProductCart); // ok 
router.delete('/remove-product-cart/:idUser?/:productId?',removeProductFromCart)
router.delete('/clear-cart/:idUser?',clearCart)
export default router;