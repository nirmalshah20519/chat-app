import express from "express";
import {
  acceptRequest,
  getMyRequests,
  rejectRequest,
  sendRequest,
} from "../Controllers/requestController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/sendRequest", verifyToken, sendRequest);
router.post("/acceptRequest", verifyToken, acceptRequest);
router.post("/rejectRequest", verifyToken, rejectRequest);
router.get("/getMyRequests/:email", verifyToken, getMyRequests);

export default router;
