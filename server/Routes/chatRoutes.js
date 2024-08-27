import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { getChatById, getMyFriends } from "../Controllers/chatController.js";

const router = express.Router();

router.get("/getMyFriends", verifyToken, getMyFriends);
router.get("/getChatById/:chatId", verifyToken, getChatById);


export default router;
