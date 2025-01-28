
import mongoose from 'mongoose'
mongoose.set('strictQuery',false) ;
// const MONGO_URI =
//   "mongodb+srv://phuongtay52636:IZXVvgWDoxlmMvd3@database-clothes-tayngu.vuvq9.mongodb.net/?retryWrites=true&w=majority&appName=database-clothes-taynguyen52636";


const MONGO_URI = 'mongodb+srv://3122410008:123123123@clothes-project.tvwyy.mongodb.net/clothes-store?retryWrites=true&w=majority&appName=clothes-project';
const connection = async ()=> {
try {
await mongoose.connect(MONGO_URI);
console.log('Connect successfully!!!')
}catch(error) {
    console.error(" MongoDB connection error:", error.message);
}
}
export {connection};