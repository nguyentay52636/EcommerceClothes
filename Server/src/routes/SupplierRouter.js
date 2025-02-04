import express from 'express';
import { createSupplier, deleteSupplier, getSuppliers, getSuppliersById, updateSupplier } from '../controller/supplierContronller.js';

const router = express.Router();

router.get('/get-suppliers', getSuppliers);
router.get('/get-supplier/:idSupplier?', getSuppliersById); // Added this route
router.post('/create-supplier',createSupplier);
router.delete("/delete-supplier/:idSupplier?",deleteSupplier);
router.put('/update-supplier/:idSupplier?',updateSupplier);
export default router;
