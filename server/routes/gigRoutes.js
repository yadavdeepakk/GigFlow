import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createGig,
  getMyGigs,
  getGigs,
  getGigById,
} from "../controllers/gigController.js";

const router = express.Router();

router.post("/", protect, createGig);
router.get("/my", protect, getMyGigs);
router.get("/", getGigs);
router.get("/:id", getGigById);


export default router;
