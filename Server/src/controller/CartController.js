import { responseApi } from "../config/respone.js"
import Cart from "../models/Cart.js"

const getCartByUserId = async (req, res) => { 
    const {idUser} = req.params;
    console.log(idUser);
    if (!idUser) {
        responseApi(res, 400, null, "Id user is required");
        return;
    }
    if(idUser === '') { 
        responseApi(res,400,null,"Id user is required");
        return;
    }

try {
    const carts = await Cart.findOne({idUser:idUser});
    if(!carts) {
        responseApi(res,404,null,"Cart not found");
        return; }
        responseApi(res,200,carts,"Cart found"); 
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}
} 
export  { getCartByUserId }
//idUser , idProduct , quantity
