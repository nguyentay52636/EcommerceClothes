import { Server } from "socket.io";
import Chat from "../models/Chat.js";
import User from "../models/User.js"; // Model user

export const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  const onlineUsers = new Map(); // Lưu userId -> socketId

  io.on("connection", async (socket) => {
    console.log("⚡ New user connected:", socket.id);

    // Xử lý khi người dùng kết nối
    socket.on("join", async ({ userId }) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      console.log(`📌 User ${userId} online với socket: ${socket.id}`);
    });

    // Xử lý gửi tin nhắn
    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      try {
        if (!sender || !receiver || !message) return;

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);
        if (!senderUser || !receiverUser) return;

        // Lưu vào database
        const chat = new Chat({ sender, receiver, message });
        await chat.save();
        console.log(chat);

        // Lấy socketId của người nhận nếu họ đang online
        const receiverSocketId = onlineUsers.get(receiver);

        // Gửi tin nhắn cho cả hai bên
        socket.emit("receiveMessage", chat); // Hiển thị cho người gửi
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", chat); // Hiển thị cho người nhận
        }
      } catch (error) {
        console.error("❌ Lỗi khi gửi tin nhắn:", error);
      }
    });

    // Xử lý khi người dùng ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`❌ User ${socket.id} disconnected`);
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};
