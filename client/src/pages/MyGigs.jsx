import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get("/gigs/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGigs(res.data);
      } catch (error) {
        alert(error, "Failed to load my gigs");
      }
    };

    fetchMyGigs();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Gigs</h1>

      {gigs.length === 0 ? (
        <p className="text-gray-400">You haven’t posted any gigs yet.</p>
      ) : (
        gigs.map((gig) => (
          <div key={gig._id} className="card mb-4">
            <h3 className="text-lg font-semibold">{gig.title}</h3>
            <p className="text-gray-400">{gig.description}</p>
            <p className="text-indigo-400 mt-2">₹{gig.budget}</p>
          </div>
        ))
      )}
    </div>
  );
}
