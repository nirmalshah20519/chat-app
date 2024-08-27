import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { sendMessage } from "../Controllers/messageController.js";

const router = express.Router();

router.post("/sendMessage", verifyToken, sendMessage);


export default router;