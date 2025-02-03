import { responseApi } from "../config/respone.js";
import Supplier from "../models/Supplier.js";

const getSuppliers = async (req, res) => { 
try {
const suppliers = await Supplier.find();
console.log(suppliers);
responseApi(res,200,suppliers,"Get all suppliers success");
}catch(error) {
    responseApi(res,500,null,error.message);
}
}
export { getSuppliers };