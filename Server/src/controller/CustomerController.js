import LoyaltyDiscount from "../models/LoyaltyDiscount.js";
import Customer from "../models/Customer.js";
import { responseApi } from "../config/respone.js";
import validator from 'validator';
import MonetaryNorm from "../models/MonetaryNorm.js";
class CustomerController { 
   getCustomer =  async (req, res) =>  { 
    try {
      const loyaltyDiscounts = await LoyaltyDiscount.find({ status: 'active' }).sort({ requiredPoints: -1 });
      if (!loyaltyDiscounts || loyaltyDiscounts.length === 0) {
        return res.status(404).json({ message: "No active loyalty discounts available" });
      }

      const customers = await Customer.find();
      for (let customer of customers) {
        const eligibleDiscount = loyaltyDiscounts.find(discount => customer.point >= discount.requiredPoints);
        
        if (eligibleDiscount) {
          if (!customer.LoyaltyDicountId || customer.LoyaltyDicountId.toString() !== eligibleDiscount._id.toString()) {
            await Customer.updateOne(
              { _id: customer._id },
              { $set: { LoyaltyDicountId: eligibleDiscount._id } }
            );
          }
        }
      }

      const updatedCustomers = await Customer.find().populate('LoyaltyDicountId');
      res.status(200).json(updatedCustomers);
    } catch (error) {
      console.error("Error in getCustomer:", error);
      res.status(500).json({ message: "Error retrieving or updating customers", error });
    }
  }
  getCustomerById = async (req,res)=> { 
    const {id} = req.params ; 
    try {
      const customer = await Customer.findById(id);
      if(!customer) { 
          responseApi(res,404,null,"Customer not found");
      }else { 
        responseApi(res,200,customer,"Customer found");
      }
    }catch(error) { 
      responseApi(res,500,null,error.message);
    }
  }
  getCustomerByPhone = async (req,res)=> {
    const {phone} = req.params ; 
    try {
      const customer = await Customer.findOne({
        phonenumber : phone 
      })
      if(!customer) { 
        responseApi(res,404,null,"Customer not found");
   } else { 
    responseApi(res,200,customer,"Customer found");
   } 
  }catch(error) { 
    responseApi(res,500,null,error.message);
  }
}

createNewCustomer = async (req,res)=> {
  const { name, phoneNumber, totalPriceAfterDiscount, invoiceType } = req.body
  if (!name || !phoneNumber) {
    return res.status(400).json({ message: "Tên và số điện thoại là bắt buộc." });
  }


  if (!validator.isLength(name, { min: 2 })) {
    return res.status(400).json({ message: "Tên phải có ít nhất 2 ký tự." });
  }

  if (!validator.isNumeric(phoneNumber) || !validator.isLength(phonenumber, { min: 10, max: 10 })) {
    return res.status(400).json({ message: "Số điện thoại không hợp lệ. Số điện thoại phải gồm 10 chữ số." });
  }
  try { 
  
    const existingCustomer = await Customer.findOne({
      phonenumber : phoneNumber
    });
    if(existingCustomer) { 
      responseApi(res,400,null,"Customer already exists");
    }
    const newCustomer = new Customer({
      name,
      phonenumber: phoneNumber,
      
    })
    await newCustomer.save() ; 
    responseApi(res200,newCustomer,"Customer created successfully");
 
  }catch(error) { 
    responseApi(res,500,null,error.message);
  }}
  deleteCustomer = async (req,res)=> {
   const {idCustomer} = req.params ;

   try { 
    if(!idCustomer) { 
      responseApi(res,400,null,"Customer id is required");
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
     return res.status(400).json({
       message: "ID không hợp lệ.",
     });
   }
  await Customer.findByIdAndDelete(idCustomer);
  responseApi(res,200,null,"Customer deleted successfully");
   }catch(error) {
    responseApi(res,500,null,error.message);

   } 
  }

  updateCustomer = async (req,res)=> { 
    const {idCustomer} = req.params ;
    const {name,phoneNumber} = req.body ;
    let checkkCustomerExits = await Customer.findById(phoneNumber);
    if(!checkkCustomerExits) { 
      return res.status(404).json({message:"Customer not found"});
    }
    try {
      if (!idCustomer) {
        return res.status(400).json({ message: "ID khách hàng là bắt buộc." });
      }
      if (!validator.isLength(name, { min: 2 })) {
        return res.status(400).json({ message: "Tên phải có ít nhất 2 ký tự." });
      }
    
      if (!validator.isNumeric(phoneNumber) || !validator.isLength(phonenumber, { min: 10, max: 10 })) {
        return res.status(400).json({ message: "Số điện thoại không hợp lệ. Số điện thoại phải gồm 10 chữ số." });
      }
      let newCustomer = { 
        name,
        phoneNumber
      }
      const updateCustomer = await Customer.findByIdAndUpdate(idCustomer,newCustomer,{new:true});
      if(!updateCustomer) { 
        responseApi(res,404,null,"Customer not found");
      }else { 
        responseApi(res,200,updateCustomer,"Customer updated successfully");
      }

    }catch(error) { 
      responseApi(res,500,null,error.message);
  } 
  }
  updatePointCustomerByInvoice = async (req,res)=> { 
  const {idCustomer} = req.params ;
  const {totalPriceAfterDiscount} = req.body ;
  try {
const moneytaryNorm = await MonetaryNorm.findOne() ; 
if(!moneytaryNorm) { 
  responseApi(res,404,null,"Monetary Norm not found");
}
const newPointCustomer = Math.floor(totalPriceAfterDiscount/moneytaryNorm.moneyPerPoint);
 Customer.point+=newPointCustomer;
 await Customer.save({
  new:true
 });
  responseApi(res,200,Customer,"Customer point updated successfully");


  }catch(error) { 
    responseApi(res,500,null,error.message);
  } 
}
}

export default CustomerController;