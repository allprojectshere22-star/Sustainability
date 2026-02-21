// backend/index.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// Secret key for JWT signing
const JWT_SECRET = "your_jwt_secret_here"; // Change to a strong secret in production

// Simulated "users" table
const users = [];

// Register route
app.post("/register", async (req, res) => {
  const { name, email, password, age, role, isStudent } = req.body;

  if (!name || !email || !password || !age || !role) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  // Check if email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already registered" });
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  users.push({ name, email, password: hashedPassword, age, role, isStudent });

  return res.json({ success: true, message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "Missing email, password or role" });
  }

  const user = users.find((u) => u.email === email && u.role === role);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials or role" });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: "Invalid credentials or role" });
  }

  // Generate JWT token (expires in 1h)
  const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

  return res.json({ success: true, token, role: user.role });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
