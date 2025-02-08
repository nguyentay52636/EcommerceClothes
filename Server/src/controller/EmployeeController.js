import { responseApi } from "../config/respone.js"
import Employee from "../models/Emloyee.js";
import validator from 'validator';
const getEmployees = async (req, res) => {
    try {
        let employees = await Employee.find();
        responseApi(res, 200, employees, "Get all employees success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}
const createEmployee = async (req, res) => {
    const { name, address, email, phonenumber, positon, basicSalary, entryDate } = req.body;
    if (!name || !address || !email || !phonenumber || !positon || !basicSalary || !entryDate) {
        responseApi(res, 400, null, "All fields are required");
        return;
    }
    if (name === '' || address === '' || email === '' || phonenumber === '' || positon === '' || basicSalary === '' || entryDate === '') {
        responseApi(res, 400, null, "All fields are required");
        return;
    }
    if (!validator.isEmail(email)) {
        responseApi(res, 400, null, "Email is invalid");
        return;
    }
    if (!validator.isMobilePhone(phonenumber)) {
        responseApi(res, 400, null, "Phone number is invalid");
        return;
    }
    try {
        const emailExist = await Employee.findOne({
            email
        });
        if (emailExist) {
            responseApi(res, 400, null, "Email already exist");
            return;
        }
        const phonenumberExist = await Employee.findOne({
            phonenumber
        });
        if (phonenumberExist) {
            responseApi(res, 400, null, "Phone number already exist");
            return;
        }
        const newEmployee = new Employee({
            name,
            address,
            email,
            phonenumber,
            positon,
            basicSalary,
            entryDate
        })
        const employee = await newEmployee.save();
        responseApi(res, 200, employee, "Create employee success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}
const deleteEmployee = async (req, res) => {
    const { idEmployee } = req.params;
    if (!idEmployee) {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (idEmployee === '') {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    try {
        const employee = await Employee.findByIdAndDelete(idEmployee);
        if (!employee) {
            responseApi(res, 404, null, "Employee not found");
            return;
        }
        responseApi(res, 200, employee, "Delete employee success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}

const getEmployeeById = async (req, res) => {
    const { idEmployee } = req.params;
    if (!idEmployee) {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (idEmployee === '') {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    try {
        let employee = await Employee.findById(idEmployee);
        if (!employee) {
            responseApi(res, 404, null, "Employee not found");
            return;
        }
        responseApi(res, 200, employee, "Get employee success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}
//edit user change info user 
const updateEmployeeFromUser = async (req, res) => {
    const { id } = req.params;
    const { email, firstName, lastName, role } = req.body;
    if (!id) {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (id === '') {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (!email || !firstName || !lastName || !role) {
        responseApi(res, 400, null, "All fields are required");
        return;
    }
    try {
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            email,
            name: `${firstName} ${lastName}`,
            position: role
        },
            { new: true, runValidators: true })
        if (!updateEmployee) {
            responseApi(res, 404, null, "Employee not found");
            return;
        }
        responseApi(res, 200, updateEmployee, "Update employee success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}

const updateEmployee = async (req, res) => {
    const { idEmployee } = req.params;
    console.log(idEmployee);
    const { name, email, address, phonenumber, entryDate, basicSalary, position, status } = req.body
    if (!idEmployee) {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (idEmployee === '') {
        responseApi(res, 400, null, "Id employee is required");
        return;
    }
    if (!name || !email || !address || !phonenumber || !entryDate || !basicSalary || !position || !status) {
        responseApi(res, 400, null, "All fields are required");
        return;
    }
    if (!validator.isEmail(email)) {
        responseApi(res, 400, null, "Email is invalid");
        return;
    }
    if (role !== 'manager' && role !== 'employee') {
        responseApi(res, 400, null, "Role is invalid");
        return;
    }
    try {
        let newEmployee = await Employee.findByIdAndUpdate(idEmployee, {
            name,
            email,
            address,
            phonenumber,
            entryDate,
            basicSalary,
            position,
            status
        }, { new: true, runValidators: true });
        if (!newEmployee) {
            responseApi(res, 404, null, "Employee not found");
            return;
        }
        await newEmployee.save();
        responseApi(res, 200, newEmployee, "Update employee success");
        return;
    } catch (error) {
        responseApi(res, 500, null, error.message);
        return;
    }
}
export { updateEmployeeFromUser, getEmployees, createEmployee, deleteEmployee, updateEmployee, getEmployeeById };