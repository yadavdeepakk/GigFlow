import express from "express";
import auth from "../middlewares/authMiddleware.js";

import {
  createBid,
  getBidsForGig,
  hireBid,
  getMyBids,
} from "../controllers/bidController.js";

const router = express.Router();

// place a bid
router.post("/", auth, createBid);

// get bids for a specific gig
router.get("/gig/:gigId", auth, getBidsForGig);

// hire a bidder
router.post("/hire/:bidId", auth, hireBid);

// get my bids
router.get("/my", auth, getMyBids);

export default router;
