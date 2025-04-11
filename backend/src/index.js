import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/connectDb';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});