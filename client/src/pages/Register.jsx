import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-95">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account 🚀</h2>

        <form onSubmit={submit} className="space-y-4">
          <input className="input" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
          <input className="input" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" className="input" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button className="btn">Sign Up</button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-400">
          Already have an account? <a href="/login" className="text-indigo-400">Login</a>
        </p>
      </div>
    </div>
  );
}
