import { responseApi } from "../config/respone.js"
import Product from "../models/Product.js";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).array('images'); 

const getProducts  = async (req, res) => { 
try  { 
 let products =  await Product.find().populate('supplier',"name phonenumber email");
 responseApi(res,200,products,"Get all products success");
}catch(error) { 
responseApi(res,500,null,error.message);
}
 } 
 const getProductById = async (req,res) => {
const {idProduct} = req.params ;
if(!idProduct) { 
    responseApi(res,400,null,"Id product is required");
 } 
 if(idProduct === '') { 
     responseApi(res,400,null,"Id product is required");
 }

try { 
    let product = await Product.findById(idProduct);
    if(!product) { 
        responseApi(res,404,null,"Product not found");
    } else { 
        responseApi(res,200,product,"Product found");
    }
 }catch(error) { 
     responseApi(res,500,null,error.message);
 }
}
 const createProduct  = async (req,res)=> { 
 const {name ,category,size,status,description,supplier} = req.body ;

   try { 
 
    const images = req.files?.map((file) => ({
        data: file.buffer.toString("base64"),
        contentType: file.mimetype,
      }));
   const productCount =  await Product.countDocuments() ;
   const sku = `PD${(productCount+1).toString().padStart(3,'0')}`; ;
   //description 
   const validDescription =  typeof description ==="string" && description.trim() !== "" ? description.trim()  : 'N/A' ;
   const newProduct =  new Product({
    sku,
    name,
    category,
    sizes : {
        size,
        quantity : 0,
        price : 0,
        type : 'letter'
    },
    status,
    description: validDescription,
    supplier,
    images
});
await newProduct.save();
responseApi(res,200,newProduct,"Create product success");
   }catch(error) { 
    responseApi(res,500,null,error.message);
   } 
 }

    const deleteProduct = async (req,res) => { 
        const {idProduct} = req.params ;
        if(!idProduct) { 
            responseApi(res,400,null,"Id product is required");
         } 
         if(idProduct === '') { 
             responseApi(res,400,null,"Id product is required");
         }
        try {
         const product  = await Product.findById(idProduct);
            if(!product) { 
                responseApi(res,404,null,"Product not found");
            }else { 
            responseApi(res,200,product,"Product deleted successfully");
            }
        }catch(error) { 
            responseApi(res,500,null,error.message);
        } } 
    
    
    // lấy sản phẩm từ nhà cung cấp
    const getProductsBySupplier = async (req,res) => { 
        const {supplier} = req.params ;
        if(!supplier) { 
            responseApi(res,400,null,"Supplier is required");
        }
        if(supplier === '') { 
            responseApi(res,400,null,"Supplier is required");
        }
        try {
            let supplierProduct = await Product.find({
                supplier
            })
            if(!supplierProduct) { 
                responseApi(res,404,null,"Supplier not found");
            }else  { 
                responseApi(res,200,supplierProduct,"Supplier found");
            }
        }catch(error) {
            responseApi(res,500,null,error.message);
         }

        
    }
 // get product by catogory 
    const getProductsByCategory = async (req,res) => { 
        const {category}    = req.params ;
        if(!category) { 
            responseApi(res,400,null,"Category is required");
        }
        if(category === '') { 
            responseApi(res,400,null,"Category is required");
        }
        try {
            let categoryProduct = await Product.find({
                category
            })
            if(!categoryProduct) { 
                responseApi(res,404,null,"Category not found");
            }else  { 
                responseApi(res,200,categoryProduct,"Category found");
            }
        }catch(error) { 
            responseApi(res,500,null,error.message);
        }
    }
    // Lấy sản phẩm theo trạng thái (ví dụ: in_stock, out_of_stock)



    const updateProduct = async (req,res) => { 
    const {idProduct} = req.params  ; 
    const {sku,name,description,brand,color,sizes,category,status,tags} = req.body;
    if(!idProduct) { 
        responseApi(res,400,null,"Id product is required");
     } 
     if(idProduct === '') { 
         responseApi(res,400,null,"Id product is required");
     }
        try {
            let images;
     let validDescription = description ==="undefined"  ?  'N/A' : description 
     if (req.files && req.files.length > 0) {
       images = req.files.map((file) => ({
         data: file.buffer.toString("base64"),
         contentType: file.mimetype,
       }));
     }
     const updatedFields = {
        sku,
        name,
        category,
        description: validDescription,
        brand,
        color,
        sizes,
        status,
        tags,
      };
      // chi duoc them hinh anh vao
      if(images) { 
            updatedFields.images = images ;
      }
      //Loại bỏ các trường không có giá trị (undefined):
      Object.keys(updatedFields).forEach((key)=>
        updatedFields[key]==="undefined" && delete updatedFields[key]
    )
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true, runValidators: true }
      );
if(!updatedProduct) { 
    responseApi(res,404,null,"Product not found");
} else { 
    responseApi(res,200,updatedProduct,"Product updated successfully");
}
        }catch(error) {
            responseApi(res,500,null,error.message);
         }

    }

export {getProductsByCategory,getProducts,getProductById,updateProduct,deleteProduct,createProduct,getProductsBySupplier}