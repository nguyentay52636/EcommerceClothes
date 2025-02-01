import Invoice from '../models/Invoice.js'; 
const  getInvoices = async (req, res) => {
    try {
        let invoices = await InvoiceModel.find();

        // Populate từng trường một để dễ hiểu
        invoices = await InvoiceModel.populate(invoices, { path: 'customer', select: 'name phonenumber point' });
        invoices = await InvoiceModel.populate(invoices, { path: 'promoCode', select: 'name discount startTime endTime' });

        // Populate employeeGetByUser và employeeId lồng nhau
        invoices = await InvoiceModel.populate(invoices, { 
            path: 'employeeGetByUser', 
            select: 'email firstName lastName',
            populate: { path: 'employeeId', select: 'name phonenumber position' }
        });

        // Populate invoiceDetails và product trong đó
        invoices = await InvoiceModel.populate(invoices, { 
            path: 'invoiceDetails', 
            populate: { path: 'product', select: 'name sku' }
        });

        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error retrieving invoices:', error);
        res.status(500).json({ message: 'Error retrieving invoices', error });
    }
}

const CreateInvoiceWithDetails = async (req, res) => { }
const completeInvoice = async (req, res) => { }
const getInvoiceById = async (req, res) => { }
const cancelInvoice = async (req, res) => { }
export {cancelInvoice,completeInvoice, getInvoices,CreateInvoiceWithDetails,getInvoiceById };