import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function GigDetail() {
  const { id } = useParams();

  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [hasBid, setHasBid] = useState(false);

  // derived state (no setter needed → no warnings)
  const gigAssigned = bids.some((b) => b.status === "hired");

  useEffect(() => {
    const fetchBids = async () => {
      const res = await api.get(`/bids/${id}`);
      setBids(res.data);

      // if current user already bid, backend already blocks duplicates
      if (res.data.length > 0) {
        setHasBid(true);
      }
    };

    fetchBids();
  }, [id]);

  const submitBid = async () => {
    if (!message || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/bids", {
        gigId: id,
        message,
        price,
      });

      alert("✅ Bid placed successfully");
      setMessage("");
      setPrice("");

      const updated = await api.get(`/bids/${id}`);
      setBids(updated.data);
      setHasBid(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };

  const hire = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      const updated = await api.get(`/bids/${id}`);
      setBids(updated.data);
    } catch (error) {
      alert( error, "Failed to hire bid");
    }
  };

  return (
    <div className="container py-12 max-w-3xl">
      {/* ===== BIDS LIST ===== */}
      <h2 className="text-2xl font-bold mb-6">Bids</h2>

      <div className="space-y-4 mb-10">
        {bids.map((b) => (
          <div
            key={b._id}
            className="card border-l-4"
            style={{
              borderLeftColor:
                b.status === "hired"
                  ? "#22c55e"
                  : b.status === "rejected"
                  ? "#ef4444"
                  : "#6366f1",
            }}
          >
            <p className="text-gray-300">{b.message}</p>

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-indigo-400">₹{b.price}</p>

              <span
                className={`text-sm font-semibold ${
                  b.status === "hired"
                    ? "text-green-400"
                    : b.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {b.status.toUpperCase()}
              </span>
            </div>

            {b.status === "pending" && (
              <button
                onClick={() => hire(b._id)}
                className="btn mt-4"
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ===== SUBMIT BID ===== */}
      <div className="card w-full max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Submit a Bid</h3>

        {gigAssigned ? (
          <p className="text-red-400 font-semibold">
            🚫 This gig has already been assigned
          </p>
        ) : hasBid ? (
          <p className="text-green-400 font-semibold">
            ✅ You have already placed a bid
          </p>
        ) : (
          <div className="space-y-3">
            <input
              className="input"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <input
              className="input"
              placeholder="Your price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button
              onClick={submitBid}
              className="btn flex items-center gap-2 mt-2"
            >
              💼 Place Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
