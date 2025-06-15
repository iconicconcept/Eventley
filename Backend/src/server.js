import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';

import eventRoutes from "./routes/eventRoutes.js"
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js"
import rateLimiter from "./middlewares/rateLimiter.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express()
const PORT = process.env.PORT | 3001

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
app.use(express.json())
app.use(rateLimiter)

app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use("/api/events", eventRoutes)
app.use("/api/user", userRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/files{/*path}",(req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    });
};

connectDB().then( ()=>{
    app.listen(PORT, ()=>{
        console.log("Server started on Port:", PORT);    
    });
})

{/*
    "image" : "https://picsum.photos/600/400",
    "title" : "Youth Conference",
    "description": "a program for all atbu students",
    "venue": "elt",
    "date": "2/3/2025",
    "time": "10am"

*/}