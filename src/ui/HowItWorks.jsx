import React from "react";
import { motion } from "framer-motion";

export default function HowItWorks({ colors }) {
  const card = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const steps = [
    {
      icon: "🍱",
      title: "Register & Join",
      desc: "Sign up as a donor, receiver, or volunteer. Choose your role and complete your profile to get started.",
    },
    {
      icon: "🎁",
      title: "Donate or Request",
      desc: "Donors list available food items with images. Receivers browse and book pickups from nearby locations.",
    },
    {
      icon: "🚚",
      title: "Coordinate Delivery",
      desc: "Delivery partners are assigned to transport food from donors to receivers, or donors can deliver directly.",
    },
    {
      icon: "🏅",
      title: "Earn Recognition",
      desc: "Track your impact, earn certificates for volunteer work, and contribute to a sustainable community.",
    },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: '#0F0E47' }}>
      <div className="container mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          🌟 How Our Platform Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {steps.map((s, index) => (
            <motion.div
              key={index}
              {...card}
              className="p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-3 text-white">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{s.title}</h3>
              <p className="text-white/90 text-sm">{s.desc}</p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
