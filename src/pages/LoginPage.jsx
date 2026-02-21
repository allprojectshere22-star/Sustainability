import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import HERO_BG from "../assets/hero-bg.jpg";
import api from "../api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleRouteMap = {
    donor: "/donor",
    volunteer: "/volunteer",
    receiver: "/receiver",
    admin: "/admin",
    event: "/green-events",
  };

  /* ======================
     VALIDATION
  ====================== */
  const validate = () => {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address";

    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";

    return "";
  };

  /* ======================
     LOGIN HANDLER
  ====================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/login", { email, password });
      const data = res.data;

      if (!data.success) {
        setError(data.message || "Invalid email or password");
        return;
      }

      /* ✅ SAVE AUTH */
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      /* 🔥 FORCE AUTH REFRESH */
      window.dispatchEvent(new Event("auth-change"));

      /* ✅ REDIRECT */
      navigate(roleRouteMap[data.role] || "/", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* HOME ICON */}
      <div className="absolute top-6 left-6 z-20">
        <FaHome
          className="text-3xl text-white cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* LEFT PANEL */}
      <div className="hidden lg:flex items-center justify-center bg-[#0F0E47] relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="relative z-10 text-center text-white px-10">
          <h1 className="text-4xl font-extrabold mb-4">Welcome Back</h1>
          <p>Sign in to continue your sustainability journey.</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-white px-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md shadow-2xl p-10 rounded-3xl"
        >
          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-xl pr-12"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm font-medium text-center">
                {error}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#0F0E47]"
              }`}
            >
              {loading ? "Signing in..." : "Login →"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
