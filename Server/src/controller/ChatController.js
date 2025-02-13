import { responseApi } from "../config/respone.js";
import Chat from '../models/Chat.js'
const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, message } = req.body;
        const chatMessage = new Chat({ sender, receiver, message });
        await chatMessage.save();
        res.status(201).json({ success: true, chatMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi gửi tin nhắn", error });
    }
};
 const getChatHistory = async (req, res) => {
    try {
        const { sender, receiver } = req.query;
        const chatHistory = await Chat.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ createdAt: 1 });

     responseApi(res, 200, true, "Lấy lịch sử chat thành công", chatHistory);
    } catch (error) {
     responseApi(res, 500, false, "Lỗi server", error);
    }}

export {getChatHistory,sendMessage};