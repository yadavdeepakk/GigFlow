import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GigDetail() {
  const { id } = useParams();

  const [gig, setGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [hasBid, setHasBid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
        setHasBid(res.data.hasBid || false);
      } catch (err) {
        alert(err, "Failed to load gig");
      }
    };

    fetchGig();
  }, [id]);

  const placeBid = async () => {
    if (!message || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/bids", {
        gigId: id,
        message,
        price,
      });

      alert("✅ Bid placed successfully");
      setHasBid(true);
      setMessage("");
      setPrice("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place bid");
    } finally {
      setLoading(false);
    }
  };

  if (!gig) return null;

  return (
    <div className="px-10 py-8">
      <h1 className="text-3xl font-bold mb-2">{gig.title}</h1>
      <p className="text-gray-400 mb-6">{gig.description}</p>

      <h2 className="text-xl font-semibold mb-4">Bids</h2>

      {hasBid ? (
        <p className="text-green-400 font-semibold">
          ✅ You have already placed a bid on this gig
        </p>
      ) : (
        <div className="card w-105 space-y-4">
          <h3 className="text-lg font-semibold">Submit a Bid</h3>

          <input
            className="input"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="number"
            className="input"
            placeholder="Your price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={placeBid}
            disabled={loading}
            className="btn w-full"
          >
            {loading ? "Placing..." : "Place Bid"}
          </button>
        </div>
      )}
    </div>
  );
}
