import express from "express";
import { authenticateUser, getAllUsers, getUserById, getUserByQuery, loginUser, registerUser, verifyUser } from "../Controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();


router.post('/register', registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.post('/authenticate', authenticateUser);

// Protected route (JWT required)
router.get('/getByEmail/:email', verifyToken, getUserById);
router.get('/search', verifyToken, getUserByQuery);


// apis for testing

router.get('/getAll', getAllUsers);

export default router