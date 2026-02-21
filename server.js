import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import contactRoutes from "./routes/contact.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api", contactRoutes);



/* ================= HTTP + SOCKET ================= */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

/* ================= SOCKET ================= */
io.on("connection", socket => {
  socket.on("join", room => {
    socket.join(room);
  });
});


/* ================= DATABASE ================= */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
console.log("✅ MySQL Connected");

/* ================= JWT MIDDLEWARE ================= */
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(403);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
};



/* ================= AUTH ================= */

// ================= GET LOGGED-IN USER =================
app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const [[user]] = await db.query(
      "SELECT id, name, email, role, contact, location FROM users WHERE id=?",
      [req.user.id]
    );

    if (!user) return res.sendStatus(404);

    res.json(user);
  } catch (err) {
    console.error("AUTH ME ERROR:", err);
    res.sendStatus(500);
  }
});


app.post("/api/register", async (req, res) => {
  const { name, email, password, role, age, contact, isStudent } = req.body;

  if (!name || !email || !password || !role || !age || !contact) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const [exist] = await db.query(
    "SELECT id FROM users WHERE email=?",
    [email]
  );

  if (exist.length) {
    return res.json({ success: false, message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO users
     (name, email, password, age, role, contact, isStudent)
     VALUES (?,?,?,?,?,?,?)`,
    [name, email, hash, age, role, contact, isStudent]
  );

  res.json({ success: true });
});



app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      success: true,
      token,
      userId: user.id,
      role: user.role
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




// Update user profile
app.put("/api/auth/update-profile", verifyToken, async (req, res) => {
  const { name, contact, location } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ message: "Name and contact required" });
  }

  try {
    await db.query(
      "UPDATE users SET name=?, contact=?, location=? WHERE id=?",
      [name, contact, location, req.user.id]
    );

    const [[user]] = await db.query(
      "SELECT id, name, email, role, contact, location FROM users WHERE id=?",
      [req.user.id]
    );

    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});



/* ================= DONOR HISTORY ================= */
app.get("/api/donor/donations", verifyToken, async (req, res) => {
  if (req.user.role !== "donor") return res.sendStatus(403);

  const [rows] = await db.query(`
    SELECT d.*, u.name AS receiver_name
    FROM donations d
    LEFT JOIN users u ON d.receiver_id = u.id
    WHERE d.donor_id = ?
    ORDER BY d.pickup_date DESC
  `, [req.user.id]);

  res.json(rows);
});

app.get("/api/donations/history", verifyToken, async (req, res) => {
  if (req.user.role !== "receiver") return res.sendStatus(403);

  try {
    const [rows] = await db.query(`
      SELECT 
        d.id,
        d.title,
        d.quantity,
        d.location,
        d.pickup_date,
        d.status,
        u.name AS donor_name
      FROM donations d
      JOIN donation_receivers dr ON d.id = dr.donation_id
      JOIN users u ON d.donor_id = u.id
      WHERE dr.receiver_id = ?
        AND dr.status = 'approved'
      ORDER BY d.pickup_date DESC
    `, [req.user.id]);

    res.json(rows);

  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ message: "History failed" });
  }
});


app.get("/api/donations/donor-history", verifyToken, async (req, res) => {
  if (req.user.role !== "donor") return res.sendStatus(403);

  const [rows] = await db.query(
    "SELECT * FROM donations WHERE donor_id=? AND status='approved'",
    [req.user.id]
  );

  res.json(rows);
});

/* ================= DONOR ================= */
app.post("/api/donations", verifyToken, async (req, res) => {
  if (req.user.role !== "donor") return res.sendStatus(403);

  const { title, quantity, pickupDate, location } = req.body;

  // 1️⃣ Insert donation
  const [result] = await db.query(
    `INSERT INTO donations
     (donor_id,title,quantity,pickup_date,location,status)
     VALUES (?,?,?,?,?,'pending')`,
    [req.user.id, title, quantity, pickupDate, location]
  );

  const donationId = result.insertId;

  // 2️⃣ Get all receivers
  const [receivers] = await db.query(
    "SELECT id FROM users WHERE role='receiver'"
  );

  // 3️⃣ Create donation_receivers rows
  for (const r of receivers) {
    await db.query(
      "INSERT INTO donation_receivers (donation_id, receiver_id) VALUES (?,?)",
      [donationId, r.id]
    );

    // 4️⃣ Insert notification
    const [notifResult] = await db.query(
      "INSERT INTO notifications (sender_id,receiver_id,message,is_read) VALUES (?,?,?,false)",
      [
        req.user.id,
        r.id,
        `New donation available: "${title}"`
      ]
    );

    const [[notification]] = await db.query(
      "SELECT * FROM notifications WHERE id=?",
      [notifResult.insertId]
    );

    io.to(`user_${r.id}`).emit("notification", notification);
  }

  res.json({ success: true });
});


app.post("/api/donations/:id/decline", verifyToken, async (req, res) => {
  if (req.user.role !== "receiver") return res.sendStatus(403);

  await db.query(
    "UPDATE donation_receivers SET status='declined' WHERE donation_id=? AND receiver_id=?",
    [req.params.id, req.user.id]
  );

  res.json({ success: true });
});


app.delete("/api/donations/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "donor") return res.sendStatus(403);

  const donationId = req.params.id;

  try {
    // 1️⃣ Delete from donation_receivers FIRST
    await db.query(
      "DELETE FROM donation_receivers WHERE donation_id=?",
      [donationId]
    );

    // 2️⃣ Then delete from donations table
    await db.query(
      "DELETE FROM donations WHERE id=? AND donor_id=?",
      [donationId, req.user.id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});


/* ================= RECEIVER ================= */
app.get("/api/donations/pending", verifyToken, async (req, res) => {
  if (req.user.role !== "receiver") return res.sendStatus(403);

  const [rows] = await db.query(`
    SELECT d.*
    FROM donations d
    JOIN donation_receivers dr ON d.id = dr.donation_id
    WHERE dr.receiver_id = ?
      AND dr.status = 'pending'
      AND d.status = 'pending'
  `, [req.user.id]);

  res.json(rows);
});



app.post("/api/donations/:id/approve", verifyToken, async (req, res) => {
  if (req.user.role !== "receiver") return res.sendStatus(403);

  const donationId = req.params.id;

  // 1️⃣ Check if still pending
  const [[donation]] = await db.query(
    "SELECT donor_id, title, status FROM donations WHERE id=?",
    [donationId]
  );

  if (!donation || donation.status !== "pending") {
    return res.status(400).json({ message: "Already approved" });
  }

  // 2️⃣ Approve main donation
  await db.query(
    "UPDATE donations SET status='approved', receiver_id=? WHERE id=?",
    [req.user.id, donationId]
  );

  // 3️⃣ Mark this receiver approved
  await db.query(
    "UPDATE donation_receivers SET status='approved' WHERE donation_id=? AND receiver_id=?",
    [donationId, req.user.id]
  );

  // 4️⃣ Remove from all other receivers
  await db.query(
    "UPDATE donation_receivers SET status='declined' WHERE donation_id=? AND receiver_id!=?",
    [donationId, req.user.id]
  );

  // 5️⃣ Notify donor
  const [donorNotifResult] = await db.query(
    "INSERT INTO notifications (sender_id,receiver_id,message,is_read) VALUES (?,?,?,false)",
    [req.user.id, donation.donor_id, `Your donation "${donation.title}" was approved 🎉`]
  );

  const [[donorNotification]] = await db.query(
    "SELECT * FROM notifications WHERE id=?",
    [donorNotifResult.insertId]
  );

  io.to(`user_${donation.donor_id}`).emit("notification", donorNotification);

  res.json({ success: true });
});


/* ================= NOTIFICATIONS ================= */
app.get("/api/notifications", verifyToken, async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM notifications WHERE receiver_id=? ORDER BY id DESC",
    [req.user.id]
  );
  res.json(rows);
});

app.post("/api/notifications/mark-all-read", verifyToken, async (req, res) => {
  await db.query("UPDATE notifications SET is_read=true WHERE receiver_id=?", [req.user.id]);
  res.json({ success: true });
});

/* ================= VOLUNTEER ================= */
app.get("/api/volunteer/dashboard", verifyToken, async (req, res) => {
  if (req.user.role !== "volunteer") return res.sendStatus(403);

  // Try fetch stats
  const [[stats]] = await db.query(
    "SELECT * FROM volunteer_stats WHERE volunteer_id=?",
    [req.user.id]
  );

  // ✅ If not exists, create default stats
  if (!stats) {
    await db.query(
      "INSERT INTO volunteer_stats (volunteer_id, completed, active, rejected) VALUES (?,0,0,0)",
      [req.user.id]
    );
  }

  // Fetch again (guaranteed now)
  const [[finalStats]] = await db.query(
    "SELECT * FROM volunteer_stats WHERE volunteer_id=?",
    [req.user.id]
  );

  const [assignments] = await db.query(`
    SELECT va.id, va.status, d.title, d.quantity
    FROM volunteer_assignments va
    JOIN donations d ON d.id = va.donation_id
    WHERE va.volunteer_id=?
    ORDER BY va.created_at DESC
  `, [req.user.id]);

  res.json({
    stats: finalStats,
    assignments
  });
});


app.post("/api/volunteer/assignments/:id/accept", verifyToken, async (req, res) => {
  if (req.user.role !== "volunteer") return res.sendStatus(403);

  await db.query(
    "UPDATE volunteer_assignments SET status='ACTIVE' WHERE id=? AND volunteer_id=?",
    [req.params.id, req.user.id]
  );

  await db.query(`
    UPDATE volunteer_stats
    SET active = active + 1
    WHERE volunteer_id=?
  `, [req.user.id]);

  res.json({ success: true });
});

app.post("/api/volunteer/assignments/:id/reject", verifyToken, async (req, res) => {
  if (req.user.role !== "volunteer") return res.sendStatus(403);

  await db.query(
    "UPDATE volunteer_assignments SET status='REJECTED' WHERE id=? AND volunteer_id=?",
    [req.params.id, req.user.id]
  );

  await db.query(`
    UPDATE volunteer_stats
    SET rejected = rejected + 1
    WHERE volunteer_id=?
  `, [req.user.id]);

  res.json({ success: true });
});

app.post("/api/volunteer/assignments/:id/complete", verifyToken, async (req, res) => {
  if (req.user.role !== "volunteer") return res.sendStatus(403);

  await db.query(
    "UPDATE volunteer_assignments SET status='COMPLETED' WHERE id=? AND volunteer_id=?",
    [req.params.id, req.user.id]
  );

  await db.query(`
    UPDATE volunteer_stats
    SET completed = completed + 1,
        active = GREATEST(active - 1, 0)
    WHERE volunteer_id=?
  `, [req.user.id]);

  res.json({ success: true });
});


/* ================= START SERVER ================= */
server.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
