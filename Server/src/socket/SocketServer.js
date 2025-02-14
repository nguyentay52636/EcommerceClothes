// socket.js
import { Server } from "socket.io";
import Chat from "../models/Chat.js";
import User from "../models/User.js"; // Model user

export const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  const onlineUsers = new Map(); // Lưu userId -> socketId

  io.on("connection", (socket) => {
    console.log("⚡ New user connected:", socket.id);

    // Khi user join, lưu userId -> socketId
    socket.on("join", ({ userId }) => {
      if (!userId) return;
      onlineUsers.set(userId, socket.id);
      console.log(`📌 User ${userId} online với socket: ${socket.id}`);
    });

    // Xử lý gửi tin nhắn
    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      try {
        if (!sender || !receiver || !message || sender === receiver) return;

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);
        if (!senderUser || !receiverUser) return;

        // Lưu tin nhắn vào database
        const chat = new Chat({ sender, receiver, message, timestamp: new Date() });
        await chat.save();

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

    // Xử lý khi user ngắt kết nối
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
