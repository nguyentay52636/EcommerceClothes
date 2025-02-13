import express from "express";
import { sendMessage, getChatHistory } from "../controller/ChatController.js";
const router = express.Router();
router.post("/send", sendMessage);
router.get("/history", getChatHistory);

export default router;
