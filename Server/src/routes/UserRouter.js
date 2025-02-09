import express from 'express';
import UserController from '../controller/UserController.js';
let userController = new UserController();
const router = express.Router(); 

router.get('/get-users', userController.getUsers); // ok 
router.post('/create-user', userController.createUser);
router.get('/get-user-by-id/:idUser?', userController.getUserById); // ok
router.delete('/delete-user/:idUser?', userController.deleteUser); // ok 
router.put("/update-user/:idUser?",userController.updateUser)
router.post("/register",userController.register); // ok 
router.post("/login",userController.login); // ok 
router.put('/reset-password',userController.resetPassword);
export default router;
