import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

/**
 * Create a bid
 */
export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId) {
      return res.status(400).json({ message: "Gig ID is required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error("Create bid error:", error);
    res.status(500).json({ message: "Failed to place bid" });
  }
};

/**
 * Get bids for a specific gig
 */
export const getBidsForGig = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.id })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to load bids" });
  }
};

/**
 * Get logged-in user's bids (My Bids)
 */
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate("gigId", "title budget")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to load my bids" });
  }
};

/**
 * Hire a bid (optional / future use)
 */
export const hireBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    bid.status = "accepted";
    await bid.save();

    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: "Failed to hire bid" });
  }
};
