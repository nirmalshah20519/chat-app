import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from './Routes/userRoute.js';
import requestRoute from './Routes/requestRoute.js';
import { config } from "dotenv";
import { verifyToken } from "./middleware/verifyToken.js";
config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
// app.use(verifyToken);
app.use('/api/requests', requestRoute);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; color:blue">Welcome to Chat App</h1>')
});

const port = process.env.PORT || 5000;  // Ensure you use the correct case for environment variables
const uri = process.env.ATLAS_URI;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

mongoose.connect(uri).then(() => {
    console.log("Connected to database...");
}).catch((err) => {
    console.log(err.message);
});
