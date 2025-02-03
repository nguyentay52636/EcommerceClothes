import { responseApi } from "../config/respone.js";
import Promotion from "../models/Promotion.js";

const getPromotions = async (req, res) => {
try {
const promitions = await Promotion.find();
responseApi(res,200,promitions,"Get all promotions success");
}catch(error) {
responseApi(res,500,null,error.message);
}
 }
 const createPromotion = async (req, res) => {
const {name,startTime,endTime,discount} = req.body;
const start = new Date(startTime);
const end = new Date(endTime);
const now = new Date();
if(start>= end) { 
responseApi(res,400,null,"Start time must be less than end time");
}
if(!name || !discount) { 
responseApi(res,400,null,"Name and discount are required");
}
let initialStatus;
if(now < start) { 
    initialStatus  = "Not Applied";
}else if(now >= start && now <= end) {
    initialStatus = "Active";
} else   { 
    initialStatus = "Expired";
}
try {
    let uppercaseName = name.toUpperCase() ; 
    let exitsNamePromotion = await Promotion.findOne({
        name : uppercaseName

    })
    if(exitsNamePromotion) { 
        responseApi(res,400,null,"Promotion name is exists");
    }
 let newPromotion = new Promotion({
        name : name,
        startTime : start,
        endTime : end,
        discount : discount,
        status : initialStatus
 });
 await newPromotion.save();
 responseApi(res,200,newPromotion,"Create promotion success");
}catch(error) {
responseApi(res,500,null,error.message);
  } 

}


try {

}catch(error) { 

} 
 const deletePromotion = async (req, res) => { 
    const {idPromotion} = req.params;
    if(!idPromotion) { 
        responseApi(res,400,null,"Id promotion is required");
    }
    if(idPromotion === '') { 
        responseApi(res,400,null,"Id promotion is required");
    }
    try {
await Promotion.findByIdAndDelete(idPromotion);
responseApi(res,200,null,"Delete promotion success");
    }catch(error) {
        responseApi(res,500,null,error.message);
    }
 } 
 const getPromotionByName = async (req, res) => { 
let {name} = req.params;
if(!name) { 
    responseApi(res,400,null,"Promotion name is required");
if(name === '') { 
    responseApi(res,400,null,"Promotion name is required");}
 } 
 if(mongoose.Types.ObjectId.isValid(name)) { 
     responseApi(res,400,null,"Promotion name is invalid");
 }
 let nameUpperCase = name.toUpperCase();
 try { 
const promotion = await Promotion.findOne({
    name:nameUpperCase
})
if(!promotion) {
responseApi(res,404,null,'promotion does not exist');
}
if(promotion.status=="Not Applied") { 
    responseApi(res,200,promotion,"Promotion does not apply");
}else if(promotion.status== "Expired") {
    responseApi(res,200,promotion,"Promotion is active");
}else {
    responseApi(res,200,promotion,"Promotion is expired");
}

 }catch(error) { 
        responseApi(res,500,null,error.message);
 }
 
}
const  updatePromotion = async (req, res) => {
 const {idPromotion} = req.params;
    const {name,startTime,endTime,discount} = req.body;
    if(!idPromotion) { 
        responseApi(res,400,null,"Id promotion is required");
    }
    if(idPromotion === '') { 
        responseApi(res,400,null,"Id promotion is required");
    }
    if(!name || !discount) { 
        responseApi(res,400,null,"Name and discount are required");
    }
    if(startTime >= endTime) { 
        responseApi(res,400,null,"Start time must be less than end time");
    }
    const upperName = name.toUpperCase();
    try { 
let checkExitsName = await Promotion.findOne({
    name:upperName,
    _id: {$ne : idPromotion}
})
if(checkExitsName) {
    responseApi(res,400,null,"Promotion name is exists");
}
const newPromotion  = { 
    name : name,
    startTime : startTime,
    endTime : endTime,
    discount : discount
}
let promotionNew = await newPromotion.findByIdAndDelete(idPromotion,promotionNew,{new:true, runValidators:true});
responseApi(res,200,promotionNew,"Update promotion success");

    }catch(error) { 
        responseApi(res,500,null,error.message);
    } 
 } 


export {updatePromotion,getPromotionByName,deletePromotion ,getPromotions,createPromotion };