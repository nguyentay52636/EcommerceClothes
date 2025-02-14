import { responseApi } from "../config/respone.js";
import Chat from '../models/Chat.js'

 const getChatHistory = async (req, res) => {
    try {
        const chatHistory = await Chat.find();
        responseApi(res,200,chatHistory,"get susscess")
    } catch (error) {
     responseApi(res, 500, false, "Lỗi server", error);
    }}

export {getChatHistory};