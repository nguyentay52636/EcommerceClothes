import { responseApi } from "../config/respone.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt';
import JsonToken from "../config/jwt.js";
const jsonWebToken = new JsonToken();
import mongoose from 'mongoose';

class UserController { 
getUsers = async (req, res) => { 
try {
    let dataUser = await User.find()
    responseApi(res,200,dataUser,"Get all user success");
}catch(error){
    responseApi(res,500,null,"error 500");
}
} 
createUser = async (req, res) => { 
    let {email,password,firstName,lastName,role,accountStatus,employeeSelected} =req.body ;
    try { 
        const existsUser = await User.findOne({
            email : email
        });
        if(existsUser) { 
            responseApi(res,400,null,"Email is exists");
        }
        let hashPassword = password.bcrypt.hashSync(password,10);
        let newUser = new User({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName,
            role: role || "employee",
            accountStatus: accountStatus || "active",
            employeeId: employeeSelected || null,
            
        })
        await newUser.save();
        responseApi(res,200,newUser,"Create user success");

    
    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
 } 
getUserById = async (req, res) => { 
    const { idUser } = req.params; 
    if (!idUser) {
      return responseApi(res, 400, null, "Id user is required");
    }
    // if (!mongoose.Types.ObjectId.isValid(idUser)) { 
    //     responseApi(res,400,null,"Id user is invalid");
    // } 
    if(idUser === '') { 
        responseApi(res,400,null,"Id user is required");
    } 
    try { 
      let user = await User.findById(idUser);
      if (!user) { 
        return responseApi(res, 404, null, "User not found");
      } else { 
        return responseApi(res, 200, user, "User found");
      }
    } catch (error) { 
      return responseApi(res, 500, null, error.message);
    }
  }

 
deleteUser = async (req, res) => {
    const {idUser} =req.params ;
    if(idUser === '') { 
        responseApi(res,400,null,"Id user is required");
    }
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
        responseApi(res,400,null,"Id user is invalid");
    
    if(!idUser) {
        responseApi(res,400,null,"Id user is required");
    }
}
   try { 
    let UserDelete = await User.findByIdAndDelete(idUser);
    responseApi(res,200,UserDelete,"Delete user success");
   }catch(error) { 
       responseApi(res,500,null,error.message);
 }}
updateUser = async (req, res) => { 
    let {idUser}= req.params ;
    let { email,firstName, lastName}= req.body
    try {
      if(!idUser) { 
        responseApi(res,400,null,"Id user is required");
      }
      if(idUser === '') { 
          responseApi(res,400,null,"Id user is required");
      }
      if(!mongoose.Types.ObjectId.isValid(idUser)) { 
          responseApi(res,400,null,"Id user is invalid");
      }
      let newUser= {
        email : email,
        firstName : firstName,
        lastName : lastName
      }
      let userUpdate = await User.findByIdAndUpdate(idUser,newUser,   { new: true, runValidators: true });
      if(!userUpdate) {
        responseApi(res,404,null,"User not found");
      }
      responseApi(res,200,userUpdate,"Update user success");
    }catch(error) { 
        responseApi(res,500,null,error.message);
    }
 }
login = async(req,res)=> { 
let {email,password} = req.body ; 
if (email === '' || password === '') { 
    responseApi(res,400,null,"Email and password is required");
}
if(!email.includes('@')) { 
    responseApi(res,400,null,"Email is invalid");
} 
if(!email|| !password) {
    responseApi(res,400,null,"Email and password is required");
}
try{
let checkEmailExits = await User.findOne({
    email : email
})
if(!checkEmailExits) { 
    responseApi(res,404,null,"Email not found");
}
if( checkEmailExits.email !== email || checkEmailExits.password !== password) { 

    responseApi(res,200,checkEmailExits,"Login success");
}else { 
    responseApi(res,404,null,"Email or password is invalid"); }
}catch(error) { 
    responseApi(res,500,null,error.message);
}
}
register = async(req,res)=> { 
let {email,password ,firtsName ,lastName , role ,accountStatus } = req.body;
if(!email || !password || !firtsName || !lastName) { 
    responseApi(res,400,null,"Email, password, firstName, lastName is required");
} 
const checkEmailExits = await User.findOne({
    email : email
})
if(checkEmailExits) { 
    responseApi(res,400,null,"Email is exists");
}
if(validator.isEmail(email)) { 
    responseApi(res,400,null,"Email is invalid");
}
try {
    let hashedPassword =  bcrypt.hashSync(password,10);
    let newUser = new User({
        email :email,
        password : hashedPassword,
        firstName : firtsName,
        lastName : lastName,
        role : role || "client",
        accountStatus : accountStatus || "active",
    });
     await newUser.save();
        responseApi(res,200,newUser,"Register success");
}catch(error) { 
    responseApi(res,500,null,error.message);
}

}
resetPassword = async(req,res)=> { 
let {token,password} = req.body ;
try {
let decoded =  await  jsonWebToken.verifyToken(token);
if (new Date() > new Date(decoded.otpExpiry)) { 
responseApi(res,400,null,"Token is expired");
}
const user = await User.findOne({
    email : decoded.email
})
if(!user) { 
    responseApi(res,404,null,"User not found");
}
      const hashedPassword = await bcrypt.hash(password, 10);
      User.password = hashedPassword;
      await User.save();
        responseApi(res,200,null,"Reset password success");
}catch(error) { 
    responseApi(res,500,null,error.message);
}
}
} 

export default UserController;