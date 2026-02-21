import express from "express";
import mysql from "mysql2";

const router = express.Router();

/* =========================
   MYSQL CONNECTION
========================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // change if needed
  password: "fedo28",          // your MySQL password
  database: "sustain_app" // your DB name
});

/* =========================
   TEST CONNECTION
========================= */
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ request MySQL connected");
  }
});

/* =========================
   CONTACT FORM API
   POST /api/contact
========================= */
router.post("/contact", (req, res) => {
  try {
    const { name, phone, eventType, date, message } = req.body;

    // Basic validation
    if (!name || !phone || !eventType || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const sql = `
      INSERT INTO contacts
      (name, phone, event_type, event_date, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, phone, eventType, date, message || null],
      (err, result) => {
        if (err) {
          console.error("❌ Insert error:", err.message);
          return res.status(500).json({
            success: false,
            message: "Database error",
          });
        }

        return res.json({
          success: true,
          id: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("❌ Server error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
