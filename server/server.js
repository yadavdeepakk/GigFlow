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

/* ✅ CORS – FINAL VERSION */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gig-flow-murex.vercel.app",
      "https://gig-flow-2ltofh94y-deepak-yadavs-projects-ef596899.vercel.app",
    ],
    credentials: true,
  })
);

app.options("/", cors());


/* ✅ VERY IMPORTANT: handle preflight */

app.use(express.json());
app.use(cookieParser());

connectDB();

/* routes */
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

/* health */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
