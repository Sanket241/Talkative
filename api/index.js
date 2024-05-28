dotenv.config();
import dotenv from "dotenv";
import express from "express";
import ConnectDb from './config/database.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.listen(PORT,()=>{
    try {
        console.log(`Server is running on port ${PORT}`);
        ConnectDb(process.env.MONGO_URL);
    } catch (error) {
        console.log("Error connecting to database")
    }
})