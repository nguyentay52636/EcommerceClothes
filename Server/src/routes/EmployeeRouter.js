import express from 'express' ;
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee, updateEmployeeFromUser } from '../controller/EmployeeController.js';
const router = express.Router();
router.get('/get-employees',getEmployees) ; //ok
router.post('/create-employee',createEmployee) ; //ok
router.delete('/delete-employee/:idEmployee?',deleteEmployee) ; // ok 
router.put('/update-employee/:idEmployee?',updateEmployee) ; // ok 
router.get('/get-employee-by-id/:idEmployee?',getEmployeeById) ; // ok 
router.put('/update-employee-from-user/:id?',updateEmployeeFromUser) ; // ok 

export default router