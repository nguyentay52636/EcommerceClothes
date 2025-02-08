import ImportNote from "../models/ImportNote.js"
import { responseApi } from "../config/respone.js";
const getImportAndImportDetails=  async (req, res) => {
   try {
    const importData  = await ImportNote.find()
    .populate('supplierId', 'name phonenumber email') 
    .populate('createdBy', 'lastName firstName email') 

    responseApi(res,200,importData,"Get all import note success");
   }catch(error) {
    responseApi(res,500,null,error.message);
   }

 }
 const getImportNoteById = async (req, res) => {
    const {idImportNote}  =req.params ; 
    try {
        const dataImport =  await ImportNote.findById(idImportNote)
        .populate("supplierId","name phonenumber email")
        .populate("createdBy", "lastName firstName email") 
        // .populate({
        //     path: "importNoteDetail",
        //     populate: {
        //         path: "productId",
        //         options :{strictPopulate: false},
        //         select: "name sku"
        //     }
        // }).exec();  
  
        if(!dataImport) { 
            responseApi(res,404,null,"Import note not found");
        }
        responseApi(res,200,dataImport,"Get import note by id success");

    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
}
    const updateStatusImportNote = async (req, res) => {
        const {idImportNote} = req.params ; 
        if(!idImportNote) { 
            responseApi(res,404,null,"Id import note is required");
        }
        if(idImportNote=== '') { 
            responseApi(res,404,null,"Id import note is required");
        }
        try {
             let updateImportNote = await ImportNote.findByIdAndUpdate(idImportNote,{
                status :"Completed"
             },
            {new : true ,runValidators:true})
          if(!updateImportNote) { 
            responseApi(res,404,null,"Import note not found");
          } else { 
            responseApi(res,200,updateImportNote,"Import note status updated to Completed successfully");
          }
        }catch(error){
            responseApi(res,500,null,error.message);
        }
    }
    const cancelStatusImportNote = async (req, res) => {
    const { idImportNote } = req.params;
    if (!idImportNote) {
        responseApi(res, 404, null, "Id import note is required");
    }
    if (idImportNote === '') {
        responseApi(res, 404, null, "Id import note is required");
    }
    try {
      cancelImportNote = await ImportNote.findByIdAndUpdate(idImportNote,{
        status : "Cancelled"
      },{new : true, runValidators : true})
      if(!cancelImportNote) {
        responseApi(res,404,null,"Import note not found");
      }else {
        responseApi(res,200,cancelImportNote,"Import note status updated to Cancelled successfully");
      }
    }catch(error){
        responseApi(res, 500, null, error.message);
    }
} 
//tao 1 phieu nhap hang moi 
const createImportNoteWithImportNoteDetail = async (req, res) =>{
const { noteData} = req.body ; 
try {
 const totalAmount = noteData.products.reduce((sum,product)=> { 
    const productTotal =product.total;
 return  sum + productTotal;
 },0);
 const importNote = new ImportNote.find() ; 
 let noteCode = "GR001" ; 
if(importNote.length  > 0 ) { 
const lastNote = importNote[importNote.length - 1].noteCode;
const match = lastNote.match(/^GR(\d+)$/);
if(match) { 
    const lastNumber = parseInt(match[1],10);
    const nextNumber = lastNumber + 1 ; 
    // dinh dang lai 
     noteCode = `GR${nextNumber.toString().padStart(3,'0')}`;   
} 
const importNote = new ImportNote({
    supplierId : noteData.supplierId,
    noteCode,
    createdBy : noteData.userId,
    totalAmount,

})
const saveImportNote = await importNote.save();
const importNoteDetails = noteData.products.map((product)=> { 
(
    {
        importNoteId : saveImportNote._id,
        productId : product.id,
        size : product.size,
        quantity : product.quantity,
        price : product.price,
        total : product.total
    }
)
})
await importNoteDetails.insertMany(importNoteDetails);
responseApi(res,200,saveImportNote,"Create import note success");
}
}catch(error) { 
    responseApi(res,500,null,error.message);
}

}
export {getImportAndImportDetails,createImportNoteWithImportNoteDetail,getImportNoteById,updateStatusImportNote,cancelStatusImportNote}