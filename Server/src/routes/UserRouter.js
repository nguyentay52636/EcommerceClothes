import express from 'express';
import UserController from '../controller/UserController.js';
let userController = new UserController();
const router = express.Router(); 

router.get('/get-users', userController.getUsers);
router.post('/create-user', userController.createUser);
router.get('/get-user/:idUser?', userController.getUserById);
router.delete('/delete-user/:idUser?', userController.deleteUser);
router.put("/update-user/:idUser?",userController.updateUser)
router.put("/register",userController.register);
router.post("/login",userController.login);
router.put('reset-password',userController.resetPassword);
export default router;
