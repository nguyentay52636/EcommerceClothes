import mongoose from "mongoose";
import { responseApi } from "../config/respone.js";
import Supplier from "../models/Supplier.js";
import validator from "validator";

const getSuppliers = async (req, res) => { 
try {
const suppliers = await Supplier.find();
console.log(suppliers);
responseApi(res,200,suppliers,"Get all suppliers success");
}catch(error) {
    responseApi(res,500,null,error.message);
}
}
const getSuppliersById = async (req,res) => { 
const {idSupplier} = req.params ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required");
}
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");
}
if(idSupplier.length < 24) { 
    responseApi(res,400,null,"Id supplier is invalid length < 24");
}
if(mongoose.Types.ObjectId.isValid(idSupplier) === false) { 
    responseApi(res,400,null,"Id supplier is invalid");
} 
 
try { 
let supplier  = await Supplier.findById(idSupplier);
responseApi(res,200,supplier,"Get supplier by id success");
}catch(error) { 
responseApi(res,500,null,error.message);
}
}
const createSupplier = async (req,res) => {
const {name,phonenumber,address,email} = req.body; 
if (!name) {
    return responseApi(res, 400, null, "Name is required.");
  }

  if (!phonenumber) {
    return responseApi(res, 400, null, "Phone number is required.");
  }

  if (!address) {
    return responseApi(res, 400, null, "Address is required.");
  }

  if (!email) {
    return responseApi(res, 400, null, "Email is required.");
  }
if(!validator.isEmail(email)) { 
    responseApi(res,400,null,"Email is invalid");
}

try { 
    let newSupplier = new Supplier({
        name :name , 
        phonenumber : phonenumber,
        address : address,
        email : email
    
    })
    await newSupplier.save();
    responseApi(res,200,newSupplier,"Create supplier success");
}catch(error) { 
    responseApi(res,500,null,error.message);
} 
}
const deleteSupplier = async (req,res) => { 
const {idSupplier} = req.params ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required");
}
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");    
}
if(mongoose.Types.ObjectId.isValid(idSupplier) === false) { 
    responseApi(res,400,null,"Id supplier is invalid");
} 
try {
    await Supplier.findByIdAndDelete(idSupplier);
    responseApi(res,200,null,"Delete supplier success");
}catch(error) { 
    responseApi(res,500,null,error.message);
}
}
const updateSupplier  = async (req,res) => { 
    let {idSupplier} = req.params ;
 let {name,phonenumber,address,email} = req.body ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required"); } 
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");
} 
if(!validator.isEmail(email)) {  
    responseApi(res,400,null,"Email is invalid");
} 
if(!mongoose.Types.ObjectId.isValid(idSupplier)) {
    responseApi(res,400,null,"Id supplier is invalid");
 } 

try {
let  newSupplier = {
    name : name,
    phonenumber : phonenumber,
    address : address,
    email : email
};
const updateSupplier = await Supplier.findByIdAndUpdate(idSupplier,newSupplier,{new:true,runValidators:true});
if(!updateSupplier) { 
    responseApi(res,404,null,"Supplier not found");
}else {
    responseApi(res,200,updateSupplier,"Update supplier success");
}
}catch(error) { 
    responseApi(res,500,null,error.message);
}

} 
export {updateSupplier,deleteSupplier,createSupplier,getSuppliersById, getSuppliers };