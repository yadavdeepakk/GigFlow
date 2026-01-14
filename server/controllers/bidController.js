import Bid from "../models/Bid.js";
import Gig from "../models/gig.js";
import mongoose from "mongoose";

export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;
    const userId = req.user._id;

    const gig = await Gig.findById(gigId);

    // ❌ gig not found
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // ❌ gig already assigned
    if (gig.status === "assigned") {
      return res
        .status(400)
        .json({ message: "This gig is already assigned" });
    }

    // ❌ owner cannot bid on own gig
    if (gig.ownerId.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot bid on your own gig" });
    }

    // ❌ duplicate bid
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: userId,
    });

    if (existingBid) {
      return res
        .status(400)
        .json({ message: "You already placed a bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: userId,
      message,
      price,
      status: "pending",
    });

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place bid" });
  }
};



export const getBidsForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ gigId: gig._id }).populate(
      "freelancerId",
      "name email"
    );

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    const gig = await Gig.findById(bid.gigId).session(session);

    if (!gig || gig.status !== "open") {
      throw new Error("Gig already assigned");
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw new Error("Not authorized");
    }

    // update gig
    gig.status = "assigned";
    await gig.save({ session });

    // update selected bid
    bid.status = "hired";
    await bid.save({ session });

    // reject other bids
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Freelancer hired successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

// GET /api/bids/my
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ userId: req.user.id })
      .populate("gigId")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch my bids" });
  }
};
