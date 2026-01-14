import { useState } from "react";
import api from "../api/axios";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/gigs", {
        title,
        description,
        budget,
      });

      alert("Gig created successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Failed to create gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Gig
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            placeholder="Gig Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="input h-28"
            placeholder="Gig Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            className="input"
            placeholder="Budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
}
