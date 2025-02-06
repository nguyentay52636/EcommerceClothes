import express from 'express' ;
import { createProduct, deleteProduct, getProductById, getProducts, getProductsByCategory, getProductsBySupplier, updateProduct } from '../controller/ProductController.js';
import multer from 'multer';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.get('/get-products',getProducts) ; // ok
router.get('/get-products-by-id/:idProduct?',getProductById) ; // ok 
router.post('/create-product',upload.array("images"),createProduct) ; // ok 
router.delete('/delete-product/:idProduct?',deleteProduct) ; // ok
router.put("/update-products/:idProduct?",updateProduct) ;
router.get('/get-products-by-category/:category?',getProductsByCategory) ; 

router.get('/get-products-by-supplier/:supplier?',getProductsBySupplier) ; 
export default router ;