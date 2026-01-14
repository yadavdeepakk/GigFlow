import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b border-white/10">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-400">
        GigFlow
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        {/* Always visible */}
        <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">
          Explore Gigs
        </Link>

        {loggedIn ? (
          <>
            {/* Visible only when logged in */}
            <Link
              to="/create-gig"
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Post Gig
            </Link>

            <Link to="/my-gigs">My Gigs</Link>
            <Link to="/my-bids">My Bids</Link>

            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Visible only when logged out */}
            <Link
              to="/login"
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-white cursor-pointer"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
