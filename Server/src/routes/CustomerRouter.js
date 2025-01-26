import express from 'express';
import CustomerController from '../controller/CustomerController.js';

const router = express.Router();
const customerController = new CustomerController();

router.get("/get-customers", customerController.getCustomer);
router.get("/get-customer/:id",customerController.getCustomerById);
router.get('/get-customer-by-phone/:phonenumber',customerController.getCustomerByPhone);
router.post("/add-customer",customerController.createNewCustomer);
router.put("/update-customer/:id?",customerController.updateCustomer);
router.delete("/delete-customer/:id?",customerController.deleteCustomer);
// router.patch("/update-point-by-invoice/:id",custoerController.)
export default router;