import React, { useState } from "react";
import { motion } from "framer-motion";
import HERO_BG from "../assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    contact: ""
  });

  const [role, setRole] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return "Invalid email format";

    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    if (!formData.age || formData.age < 18)
      return "Age must be 18 or above";

    if (!/^[6-9]\d{9}$/.test(formData.contact))
      return "Enter valid 10-digit contact number";

    if (!role)
      return "Please select a role";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const dataToSend = {
      ...formData,
      phone: formData.contact,
      role,
      isStudent
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      if (result.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 relative">

      {/* TOP ICONS */}
      <div className="absolute top-6 left-1 flex items-center gap-4 z-20">
        <IoArrowBack
          className="text-3xl text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <FaHome
          className="text-3xl text-[#0F0E47] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* LEFT SIDE */}
      <div className="flex items-center justify-center bg-white py-16 px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-2xl bg-white/95 shadow-2xl p-12 rounded-3xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border"
                required
              />
            </div>

            {/* PASSWORD WITH EYE ICON */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border pr-12"
                  required
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border"
                required
              />
            </div>

            {/* Student */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-[#0F0E47]"
                onChange={(e) => setIsStudent(e.target.checked)}
              />
              <span className="text-sm font-semibold text-[#0F0E47]">
                I am a student (optional)
              </span>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-sm font-semibold text-[#0F0E47]">
                Select Your Role
              </label>

              <div className="mt-3 grid grid-cols-2 gap-4">
                {["volunteer", "receiver", "donor", "event"].map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer
                      ${
                        role === r
                          ? "border-[#0F0E47] bg-[#0F0E47]/10"
                          : "border-gray-300"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={role === r}
                      onChange={() => handleRoleChange(r)}
                      className="accent-[#0F0E47]"
                    />
                    <span className="capitalize font-semibold text-[#0F0E47]">
                      {r === "event" ? "Green Event User" : r}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold bg-[#0F0E47]"
            >
              Continue →
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?
              <span
                className="ml-1 font-semibold cursor-pointer text-[#0F0E47]"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </span>
            </p>
          </form>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative hidden lg:flex items-center justify-center bg-[#0F0E47]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl font-extrabold">
            Create Your Account
          </h1>
          <p className="mt-4 text-white/80">
            Join the Sustain community and build a greener future.
          </p>
        </div>
      </div>
    </div>
  );
}
