import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGO DB connected to host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGO DB connection error", error);
        process.exit(1);
    }
}

export default connectDB