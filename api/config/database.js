import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectDb =async(MONGO_URL)=>{
    try {
        mongoose.connect(MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Error connecting to database")
    }
}
export default connectDb