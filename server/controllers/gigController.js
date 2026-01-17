import Gig from "../models/Gig.js";

/**
 * Create a new gig
 */
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      createdBy: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error("Create gig error:", error);
    res.status(500).json({ message: "Failed to create gig" });
  }
};

/**
 * Get all gigs (Explore gigs)
 */
export const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to load gigs" });
  }
};

/**
 * Get single gig by ID
 */
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: "Failed to load gig" });
  }
};

/**
 * Get gigs created by logged-in user (My Gigs)
 */
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to load my gigs" });
  }
};
