import { responseApi } from "../config/respone.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

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
    const carts = await Cart.findOne({user_id:idUser}).populate('items.product_id');
    if(!carts) {
        responseApi(res,404,null,"Cart not found");
        return; }
        responseApi(res,200,carts,"Cart found"); 
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}
} 
const createProductCart = async (req, res) => {
    const { idUser, idProduct } = req.params;
    console.log("🛍️ ID Product:", idProduct);
    console.log("👤 ID User:", idUser);

    const { quantity, selectedSize } = req.body;

    if (!idUser) {
        responseApi(res, 400, null, "User ID is required");
        return;
    }
    if (!idProduct) {
        responseApi(res, 400, null, "Product ID is required");
        return;
    }
    if (!quantity || quantity < 1) {
        responseApi(res, 400, null, "Quantity must be greater than 0");
        return;
    }

    try {
        // Lấy sản phẩm từ database
        const product = await Product.findById(idProduct);
        if (!product) {
            responseApi(res, 404, null, "Product not found");
            return;
        }

        // Kiểm tra size có tồn tại không
        const selectedSizeObj = product.sizes.find(sizeObj => {
            return sizeObj.size?.toString() === selectedSize;
        });
        
        if (!selectedSizeObj) {
            responseApi(res, 400, null, "Selected size not found");
            return;
        }

        const unitPrice = selectedSizeObj.price;

        let cart = await Cart.findOne({ user_id: idUser });
        if (!cart) {
            cart = new Cart({
                user_id: idUser,
                items: [],
                totalQuantity: 0,
                totalPrice: 0
            });
        }

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = cart.items.find(item => 
            item.product_id.toString() === idProduct && item.selectedSize === selectedSize
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
        } else {
            cart.items.push({
                product_id: idProduct,
                name: product.name,
                selectedSize: selectedSize,
                quantity: quantity,
                unitPrice: unitPrice,
                totalPrice: quantity * unitPrice
            });
        }

        // Cập nhật tổng số lượng và giá tiền của giỏ hàng
        cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

        await cart.save();
        responseApi(res, 200, cart, "Added to cart successfully!");
        return;
    } catch (error) {
        console.error("❌ Error:", error);
        responseApi(res, 500, null, error.message);
        return;
    }
};

const removeProductFromCart = async(req,res)=> {
const {idUser,productId} = req.params;
if(!idUser) {
    responseApi(res,400,null,"Id user is required");
    return;
}
if(!productId) { 
    responseApi(res,400,null,"Id product is required");
    return;
} 

 try{
let cart = await Cart.findOne({
    user_id :idUser
})
if(cart) {
    cart.items = cart.items.filter(()=> {
        return item.product_id.toString() !== productId
    })
    cart.totalQuantity = cart.items.reduce((sum,item)=>sum+item.quantity,0);
    cart.totalPrice = cart.items.reduce((sum,item)=>sum+item.totalPrice,0)
    responseApi(res,200,cart,"remove product success!!!");
    return;
}else {
    responseApi(res,404,null,"Cart not found");
    return;
}

 }catch(error) {
    responseApi(res,500,null,error.message);
    return;
 }

}
const clearCart = async (req,res)=> {
    const {idUser} = req.params;
    if(!idUser) {
        responseApi(res,400,null,"Id user is required");
        return; }
    try {
        let cart = await Cart.findOne({user_id:idUser});
        if(!cart) {
            responseApi(res,404,null,"Cart not found");
            return;
        }
        cart.items = [];
        cart.totalQuantity = 0;
        cart.totalPrice = 0;
        await cart.save();
        responseApi(res,200,cart,"clear cart success!!!");
    }catch(error) {
        responseApi(res,500,null,error.message);
    }
     }


export  { getCartByUserId,createProductCart,removeProductFromCart,clearCart }

