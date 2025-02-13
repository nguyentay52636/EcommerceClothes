import express from 'express';
import CustomerRouter from './CustomerRouter.js';
import UserRouter from './UserRouter.js';
import InvoiceRouter from './InvoiceRouter.js';
import PromotionRouter from './PromtionRouter.js';
import SupplierRouter from './SupplierRouter.js';
import ProductRouter from './ProductRouter.js';
import EmployeeRouter from './EmployeeRouter.js';
import ImportNoteRouter from './ ImportNoteRouter.js';
import LoyaltyDiscountRouter from './LoyaltyDiscountRouter.js';
import CartRouter from './CartRouter.js';
import ReviewRouter from './ReviewRouter.js';
import ChatRouter from './ChatRouter.js';
const rootRouter = express.Router();
rootRouter.use('/customers', CustomerRouter);
rootRouter.use('/auth', UserRouter);
rootRouter.use('/invoices', InvoiceRouter);
rootRouter.use("/promotions",PromotionRouter);
rootRouter.use('/suppliers',SupplierRouter);
rootRouter.use('/products',ProductRouter)
rootRouter.use('/employees',EmployeeRouter)
rootRouter.use("/import-notes",ImportNoteRouter); 
rootRouter.use('/loyalty-discount',LoyaltyDiscountRouter);
rootRouter.use('/carts',CartRouter);
rootRouter.use('/reviews', ReviewRouter);
rootRouter.use('/chat', ChatRouter);
export default rootRouter;
