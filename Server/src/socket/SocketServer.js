import { Server } from "socket.io";
import Chat from "../models/Chat.js"; // Model lưu tin nhắn vào database

export const setupSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log("⚡ New user connected:", socket.id);
        socket.join("room1");
        console.log(socket.rooms)
        // Lắng nghe khi client gửi tin nhắn
        socket.on("sendMessage", async (data) => {
            try {
                const { sender, receiver, message } = data;

                if (!sender || !receiver || !message) {
                    return;
                }

                // Lưu tin nhắn vào database
                const chat = new Chat({ sender, receiver, message });
                await chat.save();

                // Gửi tin nhắn đến tất cả client
                io.emit("receiveMessage", chat);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
