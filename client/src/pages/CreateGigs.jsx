import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/gigs", {
        title,
        description,
        budget,
      });

      alert("✅ Gig created successfully");
      navigate("/my-gigs");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create gig");
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
            placeholder="Gig title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="input h-28"
            placeholder="Describe the work"
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

          <button className="btn w-full">Create Gig</button>
        </form>
      </div>
    </div>
  );
}
