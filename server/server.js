import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:[ "http://localhost:5173",
    process.env.CLIENT_URL],
    credentials: true, 
  })
);

app.use(express.json());  
app.use(cookieParser());

app.use("/api/auth", authRoutes);


connectDB();

// middleware
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



// test route
app.get("/", (req, res) => {
  res.send("GigFlow API running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
