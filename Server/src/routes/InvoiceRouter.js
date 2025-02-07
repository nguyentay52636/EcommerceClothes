import express from "express";
import { CreateInvoiceWithDetails, getInvoiceById, getInvoices } from "../controller/InvoiceController.js";
const router = express.Router();
router.get("/get-invoices",getInvoices);
router.get("/get-invoice-by-id/:idInvoice?",getInvoiceById);
router.post("/create-invoice",CreateInvoiceWithDetails);

export default router;


