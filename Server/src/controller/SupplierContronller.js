import mongoose from "mongoose";
import { responseApi } from "../config/respone.js";
import Supplier from "../models/Supplier.js";

const getSuppliers = async (req, res) => { 
try {
const suppliers = await Supplier.find();
console.log(suppliers);
responseApi(res,200,suppliers,"Get all suppliers success");
return;
}catch(error) {
    responseApi(res,500,null,error.message);
    return;
}
}
const getSuppliersById = async (req,res) => { 
const {idSupplier} = req.params ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required");
    return;
}
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");
    return;
}
if(idSupplier.length < 24) { 
    responseApi(res,400,null,"Id supplier is invalid length < 24");
    return;
}
if(mongoose.Types.ObjectId.isValid(idSupplier) === false) { 
    responseApi(res,400,null,"Id supplier is invalid");
    return;
} 
 
try { 
let supplier  = await Supplier.findById(idSupplier);
responseApi(res,200,supplier,"Get supplier by id success");
return;
}catch(error) { 
responseApi(res,500,null,error.message);
return;
}
}
const createSupplier = async (req,res) => {
const {name,phonenumber,address,email} = req.body; 
if (!name) {
    responseApi(res, 400, null, "Name is required.");
    return;
  }

  if (!phonenumber) {
    responseApi(res, 400, null, "Phone number is required.");
    return;
  }

  if (!address) {
    responseApi(res, 400, null, "Address is required.");
    return;
  }

  if (!email) {
    responseApi(res, 400, null, "Email is required.");
    return;
  }
if(!validator.isEmail(email)) { 
    responseApi(res,400,null,"Email is invalid");
    return;
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
    return;
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
} 
}
const deleteSupplier = async (req,res) => { 
const {idSupplier} = req.params ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required");
    return;
}
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");    
    return;
}
if(mongoose.Types.ObjectId.isValid(idSupplier) === false) { 
    responseApi(res,400,null,"Id supplier is invalid");
    return;
} 
try {
    await Supplier.findByIdAndDelete(idSupplier);
    responseApi(res,200,null,"Delete supplier success");
    return;
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}
}
const updateSupplier  = async (req,res) => { 
    let {idSupplier} = req.params ;
 let {name,phoneNumber,address,email} = req.body ;
if(!idSupplier) { 
    responseApi(res,400,null,"Id supplier is required"); 
    return;
} 
if(idSupplier === '') { 
    responseApi(res,400,null,"Id supplier is required");
    return;
} 
if(validator.isEmail(email)=== false) {  
    responseApi(res,400,null,"Email is invalid");
    return;
} 
if(validator.isNumeric(phoneNumber)=== false) { 
    responseApi(res,400,null,"Phone number is invalid");
    return;
}
if(name|| email || phoneNumber || address) { 
    responseApi(res,400,null,"Name, email, phone number, address is required");
    return;
} 
try {
let  newSupplier = {
    name : name,
    phoneNumber : phoneNumber,
    address : address,
    email : email
};
const updateSupplier = await Supplier.findByIdByIdAndUpdate(idSupplier,newSupplier,{new:true,runValidators:true});
if(!updateSupplier) { 
    responseApi(res,404,null,"Supplier not found");
    return;
}else {
    responseApi(res,200,updateSupplier,"Update supplier success");
    return;
}
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}
} 
export {updateSupplier,deleteSupplier,createSupplier,getSuppliersById, getSuppliers };