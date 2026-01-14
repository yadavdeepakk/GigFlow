import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs/my").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="container">
      <h1 className="title">My Gigs</h1>

      {gigs.length === 0 && (
        <p className="text-gray-400">You haven’t posted any gigs yet.</p>
      )}

      <div className="grid">
        {gigs.map(g => (
          <div key={g._id} className="card">
            <h3 className="text-xl font-semibold">{g.title}</h3>
            <p className="text-gray-400">{g.description}</p>

            <p className="mt-2 text-indigo-400 font-bold">
              ₹{g.budget}
            </p>

            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="text-green-400">
                {g.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
