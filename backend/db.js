import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongodb ${error}`);
    }
}

export default connectDB

