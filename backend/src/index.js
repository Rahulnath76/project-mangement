import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './lib/connectDb.js';
import authRoute from './routes/auth.route.js';
import projectRouter from "./routes/project.route.js"
import taskRouter from './routes/task.route.js';
import profileRouter from './routes/profile.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));



const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter); 
app.use("/api/profile", profileRouter); 

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectToDatabase();
});