import { Server } from "socket.io";
import Chat from "../models/Cart.js";

export default function chatSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔥 New client connected: ${socket.id}`);

    // User tham gia vào room (User ID hoặc Admin ID)
    socket.on("joinRoom", ({ userId }) => {
      socket.join(userId);
      console.log(`👥 User ${userId} đã tham gia room`);
    });

    // Nhận tin nhắn từ client
    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      console.log(`📩 ${sender} gửi tin nhắn đến ${receiver}: ${message}`);

      try {
        // Lưu tin nhắn vào MongoDB
        const newMessage = new Chat({ sender, receiver, message });
        await newMessage.save();

        // Gửi tin nhắn đến người nhận nếu họ đang online
        io.to(receiver).emit("receiveMessage", newMessage);
      } catch (error) {
        console.error("❌ Lỗi lưu tin nhắn:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ User ${socket.id} đã ngắt kết nối`);
    });
  });
}
