import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sample = [
  { name: "Amina K.", role: "Community Organizer", quote: "This platform made food pickups effortless — saved us hours each week." },
  { name: "Carlos M.", role: "Volunteer", quote: "I love seeing real-time event slots and route assignments. Super easy!" },
  { name: "Lina R.", role: "Donor", quote: "Quick donation tracking and receipts made compliance painless." },
  { name: "Rahul S.", role: "Event Coordinator", quote: "Organizing eco-friendly events has never been simpler — everything in one dashboard!" },
  { name: "Sophia L.", role: "Volunteer", quote: "Tracking my volunteer hours and earning certificates is motivating and fun." },
  { name: "Mateo P.", role: "Donor", quote: "The food donation matching feature helped us reach the people who needed it most." },
];

export default function Testimonials({ colors }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % sample.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Define dot colors
  const activeDot = "#295B8C"; // light blue
  const inactiveDot = "#1E2A5B"; // dark blue

  return (
    <div className="relative py-10">
      <div className="overflow-hidden max-w-3xl mx-auto">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl shadow-2xl border border-white/20"
            style={{ backgroundColor: colors.dark, color: "white" }}
          >
            <p className="text-lg md:text-xl italic text-white/90 leading-relaxed">“{sample[idx].quote}”</p>
            <div className="mt-6 text-right">
              <div className="font-bold text-white text-lg">{sample[idx].name}</div>
              <div className="text-sm text-white/70">— {sample[idx].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {sample.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIdx(i)}
            className="w-4 h-4 rounded-full"
            style={{ background: i === idx ? activeDot : inactiveDot }}
            whileTap={{ scale: 1.2 }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </div>
  );
}
