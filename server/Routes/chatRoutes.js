import express from "express";

import { verifyToken } from "../middleware/verifyToken.js";
import { getChatById, getChatIdByFriend, getMyFriends } from "../Controllers/chatController.js";

const router = express.Router();

router.get("/getMyFriends", verifyToken, getMyFriends);
router.get("/getChatById/:chatId", verifyToken, getChatById);
router.get("/getChatIdByFriend/:friendId", verifyToken, getChatIdByFriend);


export default router;
