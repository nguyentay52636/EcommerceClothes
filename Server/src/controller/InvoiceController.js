import Invoice from '../models/Invoice.js'
import { responseApi } from '../config/respone.js';
import InvoiceDetail from '../models/InvoiceDetail.js';

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

const CreateInvoiceWithDetails = async (req, res) => { }
const completeInvoice = async (req, res) => { }
const getInvoiceById = async (req, res) => { }
const cancelInvoice = async (req, res) => { }
export {cancelInvoice,completeInvoice, getInvoices,CreateInvoiceWithDetails,getInvoiceById };