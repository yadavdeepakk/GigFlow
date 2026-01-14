import Gig from "../models/gig.js";

/**
 * GET /api/gigs
 * Get all open gigs (public)
 */
export const getGigs = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { status: "open" };

    // search by title if provided
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

/**
 * GET /api/gigs/:id
 * Get single gig by ID (public)
 */
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};

/**
 * POST /api/gigs
 * Create a new gig (protected)
 */
export const createGig = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);

    const { title, description, budget } = req.body;

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id,
      status: "open",
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error("CREATE GIG FAILED ❌");
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



/**
 * GET /api/gigs/my
 * Get gigs created by logged-in user (protected)
 */
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch my gigs" });
  }
};
