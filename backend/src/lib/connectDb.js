import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToDatabase;