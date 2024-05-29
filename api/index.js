dotenv.config();
import dotenv from "dotenv";
import express from "express";
import ConnectDb from './config/database.js';
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import messageRouter from './routers/messageRouter.js'
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors())
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/message', messageRouter);




app.listen(PORT,()=>{
    try {
        console.log(`Server is running on port ${PORT}`);
        ConnectDb(process.env.MONGO_URL);
    } catch (error) {
        console.log("Error connecting to database")
    }
})