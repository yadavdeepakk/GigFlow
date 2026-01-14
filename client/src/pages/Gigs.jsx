import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
  api
    .get(`/gigs?search=${search}`)
    .then((res) => setGigs(res.data));
}, [search]);


  return (
    <div className="container py-12">
        <div className="mb-8">
  <input
    className="input max-w-md"
    placeholder="Search gigs by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <h1 className="text-3xl font-bold mb-2">
        Available Gigs
      </h1>



      <p className="text-gray-400 mb-10 max-w-xl">
        Browse open freelance gigs and start earning by bidding on projects
        that match your skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {gigs.map(g => (
          <div
            key={g._id}
            className="card transition-all duration-300 
                       hover:scale-[1.02] 
                       hover:border-indigo-500/50 
                       hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]
                       flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{g.title}</h2>
              <p className="text-gray-400 mt-2">
                {g.description}
              </p>

              <div className="flex gap-2 mt-3 text-xs">
                <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400">
                  Remote
                </span>
                <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400">
                  Freelance
                </span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-indigo-400 font-bold mb-3">
                ₹{g.budget}
              </p>

              <button
                className="btn"
                onClick={() => navigate(`/gig/${g._id}`)}
              >
                View & Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
