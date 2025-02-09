import Invoice from '../models/Invoice.js'
import { responseApi } from '../config/respone.js';

const  getInvoices = async (req, res) => {
    try {
        let invoices = await Invoice.find()
        .populate("customer","name phonenumber point")
        .populate("promoCode","name discount startTime endTime")
        .populate({
            path: "employeeGetByUser",
            select : "email lastName firstName",
            populate : {
                path:"employeeId",
                select : "email phonenumber position"
            }
        })
        .populate({
            path: 'invoiceDetails',
            populate: {
                path: 'product',
                select: 'name sku',
            },
        });
        responseApi(res,200,invoices,"Get all invoices success");
    }catch(error) {
        responseApi(res,500,null,error.message);
    }
}



const getInvoiceById = async (req, res) => {
    let {idInvoice} = req.params ;
    if(!idInvoice) {
        responseApi(res,400,null,"Id invoice is required");
    }
    if(idInvoice === '') {
        responseApi(res,400,null,"Id invoice is required");
     }
     
    try {
 const invoice = await Invoice.findById(idInvoice)
                .populate('customer', 'name phonenumber')
                .populate('promoCode', 'name discount startTime endTime')
                .populate('employeeGetByUser', 'firstName lastName email')
                .populate({
                    path: 'invoiceDetails',
                    select: 'selectedSize quantity total',
                    populate: {
                        path: 'product',
                        select: 'name sizes',
                    },
                });  ; 
 responseApi(res,200,invoice,"Get invoice success");
    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
 }
 const CreateInvoiceWithDetails = async (req, res) => {
    // const {} = req.body;

 }
 const completeInvoice = async (req, res) => {
const {idInvoice} = req.params; 
if(!idInvoice) {
    responseApi(res,400,null,"Id invoice is required");
  }
    if(idInvoice === '') {
        responseApi(res,400,null,"Id invoice is required");
    }
    try {
         const updateInvoice = await Invoice.findByIdAndUpdate(idInvoice,{
            status :"Completed",
         },{new :true , runValidators : true})
         if(!updateInvoice) { 
             responseApi(res,404,null,"Invoice not found");
         } else {
                responseApi(res,200,updateInvoice,"Complete invoice success");
         }
    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
}   
 
const cancelInvoice = async (req, res) => { }
export {cancelInvoice,completeInvoice, getInvoices,CreateInvoiceWithDetails,getInvoiceById };