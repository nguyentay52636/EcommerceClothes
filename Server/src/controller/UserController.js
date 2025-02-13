import { responseApi } from "../config/respone.js";
import User from "../models/User.js"
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';
import { checkToken, createToken,createTokenRef } from "../config/jwt.js";

class UserController { 
getUsers = async (req, res) => { 
try {
    let dataUser = await User.find()
    responseApi(res,200,dataUser,"Get all user success");
    return;
}catch(error){
    responseApi(res,500,null,"error 500");
    return;
}
} 
createUser = async (req, res) => { 
    let {email,password,firstName,lastName,accountStatus,employeeSelected} =req.body ;
    try { 
        const existsUser = await User.findOne({
            email : email
        });
        if(existsUser) { 
            responseApi(res,400,null,"Email is exists");
            return;
        }
        
        let hashPassword = bcrypt.hashSync(password,10); // Corrected bcrypt usage
        let newUser = new User({
            email : email,
            password : hashPassword,
            firstName : firstName,
            lastName : lastName,
            role:  "customer",
            accountStatus: accountStatus || "active",
            employeeId: employeeSelected || null,
            
        })
        await newUser.save();
        responseApi(res,200,newUser,"Create user success");
        return;
    
    }catch(error) { 
        responseApi(res,500,null,error.message);
        return;
    }
 } 
getUserById = async (req, res) => { 
    const { idUser } = req.params; 
    if (!idUser) {
       responseApi(res, 400, null, "Id user is required");
       return;
    }
    if (!mongoose.Types.ObjectId.isValid(idUser)) { 
        responseApi(res,400,null,"Id user is invalid");
        return;
    } 
    if(idUser === '') { 
        responseApi(res,400,null,"Id user is required");
        return;

    } 
    try { 
      let user = await User.findById(idUser);
      if (!user) { 
         responseApi(res, 404, null, "User not found");
         return;

      } else { 
         responseApi(res, 200, user, "User found");
         return;

      }
    } catch (error) { 
       responseApi(res, 500, null, error.message);
       return;
    }
  }

 
deleteUser = async (req, res) => {
    const {idUser} =req.params ;
    if(idUser === '') { 
        responseApi(res,400,null,"Id user is required");
        return;

    }
    if (!mongoose.Types.ObjectId.isValid(idUser)) {
        responseApi(res,400,null,"Id user is invalid");
        return;

    }
    if(!idUser) {
        responseApi(res,400,null,"Id user is required");
        return;

    }
   try { 
    let UserDelete = await User.findByIdAndDelete(idUser);
    responseApi(res,200,UserDelete,"Delete user success");
    return;

   }catch(error) { 
       responseApi(res,500,null,error.message);
       return;
 }}


 login = async (req, res) => {
    let { email, password } = req.body;
    console.log("Mật khẩu nhập vào:", password);
 
    
    if (!email || !password) {
        return responseApi(res, 400, null, "Email và mật khẩu không được để trống");
    }
    if (!validator.isEmail(email)) {
        return responseApi(res, 400, null, "Email không hợp lệ");
    }

    try {
        let user = await User.findOne({ email });
        console.log("Mật khẩu trong database:", user.password);
        if (!user) {
            return responseApi(res, 404, null, "Email không tồn tại");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return responseApi(res, 400, null, "Mật khẩu không chính xác");
        }
        let newHashedPassword = bcrypt.hashSync(password, 10);
        user.password = newHashedPassword;

        // ✅ Tạo token
        const accessToken = createToken(user);
        const refreshToken = createTokenRef(user);
        // ✅ Lưu refresh token vào database
        user.refreshToken = refreshToken;
        await user.save();
        return responseApi(res, 200, { accessToken,refreshToken, user }, "Đăng nhập thành công");
    } catch (error) {
        return responseApi(res, 500, null, error.message);
    }
};
register = async(req,res)=> { 
let {email,password ,firstName ,lastName , role ,accountStatus } = req.body;
console.log({email,password ,firstName ,lastName , role ,accountStatus });
if(!email || !password || !firstName || !lastName) { 
    responseApi(res,400,null,"Email, password, firstName, lastName is required");
    return;
} 
if(!validator.isEmail(email)) { 
    responseApi(res,400,null,"Email is invalid");
    return;
}

try {
    const checkUserExits = await User.findOne({
        email : email
    })
    if(checkUserExits) { 
        responseApi(res,400,null,"Email is exists");
        return;
    }
  
    let hashedPassword =  bcrypt.hashSync(password,10);
    let newUser = new User({
        email :email,
        password : hashedPassword,
        firstName : firstName,
        lastName : lastName,
        role : role || "client",
        accountStatus : accountStatus || "active",
    });
     await newUser.save();
        responseApi(res,200,newUser,"Register success");
        return;
}catch(error) { 
    responseApi(res,500,null,error.message);
    return;
}

}
resetPassword = async (req, res) => { 
    let { token, password } = req.body;
    // console.log({ token, password });

    try {
        let decoded = await checkToken(token);
        console.log("dayla " + JSON.stringify(decoded, null, 2));

        if (!decoded) { 
            responseApi(res, 400, null, "Token is invalid or expired");
            return;
        }

        const user = await User.findById(decoded.userId);
        console.log(user);

        if (!user) { 
            responseApi(res, 404, null, "User not found");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        responseApi(res, 200, null, "Reset password success");
    } catch (error) { 
        responseApi(res, 500, null, error.message);
    }
};
updateUser = async (req, res) => { 
    let {idUser}= req.params ;
    let { email,firstName, lastName}= req.body
    try {
      if(!idUser) { 
        responseApi(res,400,null,"Id user is required");
        return;

      }
      if(idUser === '') { 
          responseApi(res,400,null,"Id user is required");
          return;

      }
      if(!mongoose.Types.ObjectId.isValid(idUser)) { 
          responseApi(res,400,null,"Id user is invalid");
          return;

      }
    
      let userUpdate = await User.findByIdAndUpdate(idUser,{ 
        email : email,
        firstName : firstName,
        lastName : lastName},  
         { new: true, runValidators: true });
      if(!userUpdate) {
        responseApi(res,404,null,"User not found");
        return;

      }
      responseApi(res,200,userUpdate,"Update user success");
      return;
    }catch(error) { 
        responseApi(res,500,null,error.message);
        return;
    }
 }
}


export default UserController;