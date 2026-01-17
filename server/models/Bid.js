import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Bid = mongoose.models.Bid || mongoose.model("Bid", bidSchema);
export default Bid;
