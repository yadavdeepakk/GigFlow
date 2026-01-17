import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await api.get("/bids/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setBids(res.data);
      } catch (error) {
        alert(error, "Failed to load bids");
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Bids</h1>

      {bids.length === 0 ? (
        <p className="text-gray-400">You haven’t placed any bids yet.</p>
      ) : (
        bids.map((bid) => (
          <div key={bid._id} className="card mb-4">
            <h3 className="font-semibold">{bid.gigId?.title}</h3>
            <p className="text-gray-400">{bid.message}</p>
            <p className="text-indigo-400 mt-2">₹{bid.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
