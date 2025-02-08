import express from 'express';
import CustomerRouter from './CustomerRouter.js';
import UserRouter from './UserRouter.js';
import InvoiceRouter from './InvoiceRouter.js';
import PromotionRouter from './PromtionRouter.js';
import SupplierRouter from './SupplierRouter.js';
import ProductRouter from './ProductRouter.js';
import EmployeeRouter from './EmployeeRouter.js';
import ImportNoteRouter from './ ImportNoteRouter.js';
const rootRouter = express.Router();
rootRouter.use('/customers', CustomerRouter);
rootRouter.use('/auth', UserRouter);
rootRouter.use('/invoices', InvoiceRouter);
rootRouter.use("/promotions",PromotionRouter);
rootRouter.use('/suppliers',SupplierRouter);
rootRouter.use('/products',ProductRouter)
rootRouter.use('/employees',EmployeeRouter)
rootRouter.use("/import-notes",ImportNoteRouter)
export default rootRouter;
