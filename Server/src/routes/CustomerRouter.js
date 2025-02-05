import express from 'express';
import CustomerController from '../controller/CustomerController.js';

const router = express.Router();
const customerController = new CustomerController();

router.get("/get-customers", customerController.getCustomer);
router.get("/get-customer/:id",customerController.getCustomerById);
router.get('/get-customer-by-phone/:phone?',customerController.getCustomerByPhone);
router.post("/add-customer",customerController.createNewCustomer);
router.put("/update-customer/:idCustomer?",customerController.updateCustomer);
router.delete("/delete-customer/:idCustomer?",customerController.deleteCustomer);
router.patch("/update-point-by-invoice/:idCustomer?",customerController.updatePointCustomerByInvoice)
export default router;
