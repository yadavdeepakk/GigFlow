import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createBid,
  getBidsForGig,
  getMyBids,
  hireBid,
} from "../controllers/bidController.js";

const router = express.Router();

router.post("/", auth, createBid);
router.get("/my", auth, getMyBids);
router.get("/:id", getBidsForGig);
router.put("/hire/:id", auth, hireBid);

export default router;
