import express from "express";
import auth from "../middlewares/authMiddleware.js";

import {
  getGigs,
  getGigById,
  createGig,
  getMyGigs,
} from "../controllers/gigController.js";

const router = express.Router();

// get all open gigs (public)
router.get("/", getGigs);

// get logged-in user's gigs
router.get("/my", auth, getMyGigs);

// get single gig by id
router.get("/:id", getGigById);

// create a new gig (protected)
router.post("/", auth, createGig);

router.post("/", auth, createGig);


export default router;
