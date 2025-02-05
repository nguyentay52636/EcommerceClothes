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
    console.log(phone);
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

 createNewCustomer = async (req, res) => {
  const { name, phonenumber, totalPriceAfterDiscount, invoiceType } = req.body;

  console.log({
    name,
    phonenumber,
    totalPriceAfterDiscount,
    invoiceType
  });
  if (!name || !phonenumber) {
  responseApi(res, 400, null, "Tên và số điện thoại là bắt buộc.");
  }
  if (phonenumber.length !== 10) { 
responseApi(res, 400, null, "Số điện thoại phải có 10 chữ số.");
  }
  try {
    const existingCustomer = await Customer.findOne({ phonenumber});
    if (existingCustomer) {
       responseApi(res, 400, null, "Customer already exists by phone number");
    } else  { 

    const newCustomer = new Customer({
      name,
      phonenumber
    });

    await newCustomer.save();
     responseApi(res, 200, newCustomer, "Customer created successfully");
  }
  } catch (error) {
     responseApi(res, 500, null, error.message);
  }
};


  
  deleteCustomer = async (req,res)=> {
   const {idCustomer} = req.params ;

   try { 
    if(!idCustomer) { 
      responseApi(res,400,null,"Customer id is required");
    }
    if(idCustomer === '') { 
      responseApi(res,400,null,"Customer id is required");
    } 
   let customer = await Customer.findByIdAndDelete(idCustomer);
  responseApi(res,200,customer,"Customer deleted successfully");
   }catch(error) {
    responseApi(res,500,null,error.message);

   } 
  }

  updateCustomer = async (req, res) => {
    try {
      const { idCustomer } = req.params;
      const { name, phonenumber } = req.body;
  
      // console.log("ID Customer:", idCustomer);
      // console.log("Updated Name & Phone:", name, phonenumber);
  
      if (!idCustomer) {
        return responseApi(res, 400, null, "Id khách hàng là bắt buộc.");
      }
  

      if (!phonenumber || phonenumber.length !== 10) {
        return responseApi(res, 400, null, "Số điện thoại phải có 10 chữ số.");
      }
  

      if (!validator.isLength(name, { min: 2 })) {
        return responseApi(res, 400, null, "Tên khách hàng phải có ít nhất 2 ký tự.");
      }
  

      let checkCustomerExits = await Customer.findById(idCustomer);
      if (!checkCustomerExits) {
        return responseApi(res, 404, null, "Customer not found");
      }
  
      // Cập nhật khách hàng
      const updateCustomer = await Customer.findByIdAndUpdate(
        idCustomer,
        { name, phonenumber },
        { new: true, runValidators: true }
      );
  
      if (!updateCustomer) {
        return responseApi(res, 404, null, "Customer not found after update");
      }
  
      responseApi(res, 200, updateCustomer, "Customer updated successfully");
    } catch (error) {
      responseApi(res, 500, null, error.message);
    }
  };
    // update  point customer by invoice
  updatePointCustomerByInvoice = async (req,res)=> { 
  const {idCustomer} = req.params ;
  const {totalPriceAfterDiscount} = req.body ;
  try {
const moneytaryNorm = await MonetaryNorm.findOne() ; 
if(!moneytaryNorm) { 
  responseApi(res,404,null,"Monetary Norm not found");
}
const customer = await Customer.findById(idCustomer);
const newPointCustomer = Math.floor(totalPriceAfterDiscount/moneytaryNorm.moneyPerPoint);
customer.point+=newPointCustomer;
 await customer.save({
  new:true
 });
  responseApi(res,200,customer,"Customer point updated successfully");


  }catch(error) { 
    responseApi(res,500,null,error.message);
  } 
}
}

export default CustomerController;