import express from 'express';
import CustomerRouter  from './CustomerRouter.js';
import UserRouter from './UserRouter.js';
const rootRouter = express.Router();
rootRouter.use('/customers',CustomerRouter)
rootRouter.use("/auth",UserRouter);
export default rootRouter;
