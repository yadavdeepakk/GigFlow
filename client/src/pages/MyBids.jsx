import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api.get("/bids/my").then(res => setBids(res.data));
  }, []);

  return (
    <div className="container">
      <h1 className="title">My Bids</h1>

      {bids.length === 0 && (
        <p className="text-gray-400">You haven’t placed any bids yet.</p>
      )}

      <div className="grid">
        {bids.map(b => (
          <div key={b._id} className="card">
            <h3 className="text-lg font-semibold">
              {b.gigId?.title}
            </h3>

            <p className="text-gray-400">
              {b.message}
            </p>

            <p className="mt-2 text-indigo-400 font-bold">
              ₹{b.amount}
            </p>

            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="text-yellow-400">
                {b.status || "Pending"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
