import express from "express";
import { CreateInvoiceWithDetails, getInvoiceById, getInvoices ,completeInvoice} from "../controller/InvoiceController.js";
const router = express.Router();
router.get("/get-invoices",getInvoices); //ok 
router.get("/get-invoice-by-id/:idInvoice?",getInvoiceById); // ok 
router.post("/create-invoice",CreateInvoiceWithDetails);
router.put("/complete-invoice/:idInvoice?",completeInvoice);

export default router;


