import express from 'express';
import { getSuppliers } from '../controller/supplierContronller.js';

const router = express.Router();

router.get('/get-suppliers', getSuppliers);

export default router;