import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isActive = (path) => location.pathname === path;

const handleLogout = () => {
  localStorage.clear();
  window.dispatchEvent(new Event("auth-change"));
  navigate("/");
};

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-[80px] bg-white shadow-md">
      <div className="w-full h-full px-8 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-[#0F0E47]">
          SustainApp
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 font-medium text-[#0F0E47]">

          <Link
            to="/"
            className={isActive("/") ? "underline underline-offset-4" : ""}
          >
            Home
          </Link>

          <Link
            to="/food-management"
            className={
              isActive("/food-management")
                ? "underline underline-offset-4"
                : ""
            }
          >
            Food Donation
          </Link>

          <Link
            to="/green-events"
            className={
              isActive("/green-events")
                ? "underline underline-offset-4"
                : ""
            }
          >
            Eco Events
          </Link>

          <Link
            to="/about"
            className={isActive("/about") ? "underline underline-offset-4" : ""}
          >
            About
          </Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to={`/${role}`} className="font-semibold">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-[#0F0E47] text-white hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
