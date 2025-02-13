import express from "express";
import Chat from "../models/Chat.js";
import { responseApi } from "../config/respone.js";

const router = express.Router();
router.get("/:userId/:adminId", async (req, res) => {
  try {
    const { userId, adminId } = req.params;
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: adminId },
        { sender: adminId, receiver: userId },
      ],
    }).sort("createdAt");

    res.json(messages);
  } catch (error) {
   responseApi(res, 500, error.message);
  }
});

export default router;
