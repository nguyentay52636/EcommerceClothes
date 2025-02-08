import { responseApi } from "../config/respone.js";
import LoyaltyDiscount from "../models/LoyaltyDiscount.js";
import MonetaryNorm from "../models/MonetaryNorm.js";
const getLoyaltyDiscounts = async (req, res) => {
    try { 
 let loyaltyDiscounts =  await LoyaltyDiscount.find();
    responseApi(res,200,loyaltyDiscounts,"Get all loyalty discounts success");
    return;
    }catch(error) { 
        responseApi(res,500,null,error.message);
        return;
    }
 } 
 const getMoneytaryNorm = async(req,res)=> {
    try {
const moneytaryNorm = await MonetaryNorm.findOne() ; 
if(!moneytaryNorm) { 
responseApi(res,404,null,"Moneytary norm not found");
return;
} 
responseApi(res,200,moneytaryNorm,"Get moneytary norm success");
return;
    }catch(error) { 
responseApi(res,500,null,error.message);
return;
    }
 }
 const createLoyaltyDiscount = async (req, res) => {
const { name ,requiredPoints,discount } = req.body;

try {
    if(!name || !requiredPoints || !discount) {
        responseApi(res,400,null,"Name, required points, discount  are required")
        return;
         } 
         if(discount < 0) { 
        responseApi(res,400,null,"Discount must be greater than 0");
        return;
         } 
         const namePattern = /^UD\d+$/;
         if(!namePattern.test(name)) { 
        responseApi(res,400,null,"Name must be UD + number");
        return;
         } 
         const nameUpperCase = name.toUpperCase() ;
    const nameExitis = await LoyaltyDiscount.findOne({
        name : nameUpperCase
    })
    if(nameExitis) { 
        responseApi(res,400,null,"Loyalty discount name is exists");
        return;
    }
 const newLoyaltyDiscount  = new LoyaltyDiscount({
    name : name,
    requiredPoints : requiredPoints,
    discount : discount,
    status : "active"
 })
    await newLoyaltyDiscount.save();    
    if(!newLoyaltyDiscount) { 
        responseApi(res,400,null,"Create loyalty discount failed");
        return;
    }
    responseApi(res,200,newLoyaltyDiscount,"Create loyalty discount success");
    return;
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}
 }
 const deleteLoyaltyDiscount = async (req, res) => {
    const {idLoyaltyDiscount} = req.params;
    if(!idLoyaltyDiscount) { 
        responseApi(res,400,null,"Id loyalty discount is required");
        return;
    }
    if(idLoyaltyDiscount === '') { 
        responseApi(res,400,null,"Id loyalty discount is required");
        return;
    }
    try {
        const loyaltyDiscount = await LoyaltyDiscount.findByIdAndDelete(idLoyaltyDiscount);
        if(!loyaltyDiscount) { 
            responseApi(res,400,null,"Delete loyalty discount failed");
            return;
        }
        responseApi(res,200,loyaltyDiscount,"Delete loyalty discount success");
        return;
    }catch(error) {
        responseApi(res,500,null,error.message);
        return
    } 
} 
 
 const updateLoyaltyDiscount = async (req, res) => {
    const {idLoyaltyDiscount} = req.params;
    const {name, requiredPoints, discount,status} = req.body;
    if(!idLoyaltyDiscount) { 
        responseApi(res,400,null,"Id loyalty discount is required");
        return;
    }
    if(idLoyaltyDiscount === '') { 
        responseApi(res,400,null,"Id loyalty discount is required");
        return;
    }
    const namePattern = /^UD\d+$/;
    if(!namePattern.test(name)) { 
   responseApi(res,400,null,"Name must be UD + number");
   return;
    } 
    if(!name || !requiredPoints || !discount || !status) { 
        responseApi(res,400,null,"Name, required points, discount, status are required");
        return;
    }
    if(status !== "active" && status !== "inactive") { 
        responseApi(res,400,null,"Status must be active or inactive");
        return;
    }
    const nameUpperCase = name.toUpperCase() ;
        
    try {
        const nameExitis = await LoyaltyDiscount.findOne({
            name : nameUpperCase
        })
        if(nameExitis) { 
            responseApi(res,400,null,"Loyalty discount name is exists");
            return;
        }
        const updateLoyaltyDiscount = await LoyaltyDiscount.findByIdAndUpdate(idLoyaltyDiscount,{
            name : nameUpperCase,
            requiredPoints : requiredPoints,
            discount : discount,
            status : status
        },{new : true , runValidators : true})
        if(!updateLoyaltyDiscount) { 
            responseApi(res,400,null,"Update loyalty discount failed");
            return;
        }
        responseApi(res,200,updateLoyaltyDiscount,"Update loyalty discount success");
    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
    

 }
  //Chỉnh sửa mức tiền quy đổi điểm
 const updateMoneytaryNorm = async (req, res) => {
 const {id} = req.params;
 const {moneyPerPoint} = req.body;
    if(!id) {
        responseApi(res,400,null,"Id moneytary norm is required");
        return;
    }
    if(id === '') {
        responseApi(res,400,null,"Id moneytary norm is required");
        return;
    }
    if(!moneyPerPoint) {
        responseApi(res,400,null,"Moneytary norm is required");
        return;
    }
    try{
        const updateMoneytaryNorm = await MonetaryNorm.findByIdAndUpdate(id,{
            moneyPerPoint : moneyPerPoint
        },{new : true , runValidators : true})
        if(!updateMoneytaryNorm) { 
            responseApi(res,400,null,"Update moneytary norm failed");
            return;
        }
        responseApi(res,200,updateMoneytaryNorm,"Update moneytary norm success");   
    }catch(error) { 
        responseApi(res,500,null,error.message);
    } 
 }

export  {updateMoneytaryNorm, updateLoyaltyDiscount,getLoyaltyDiscounts,getMoneytaryNorm,createLoyaltyDiscount,deleteLoyaltyDiscount}
