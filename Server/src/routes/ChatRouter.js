import express from "express";
import { getChatHistory } from "../controller/ChatController.js";
const router = express.Router();
router.get("/history", getChatHistory);
export default router;
