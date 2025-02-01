import express from "express";
import { getInvoices } from "../controller/InvoiceController.js";
const router = express.Router();
router.get("/get-invoices",getInvoices);
export default router;