import { useNavigate } from "react-router-dom";
import HERO_BG from "../assets/hero-bg.jpg";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaRecycle, FaPhoneAlt } from "react-icons/fa";

export default function FoodManagementPage() {
  const navigate = useNavigate();

  return (
  <div className="bg-gradient-to-b from-[#0F0E47] to-[#1b1a6e] text-white min-h-screen">

  <header
  className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${HERO_BG})` }}
>
  <div className="text-center px-6 max-w-4xl" />

  <motion.section
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    className="relative z-10 px-6 text-center"
  >
    <div className="max-w-4xl mx-auto">

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Food Donation
      </h1>
      
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="max-w-3xl mx-auto text-white/90 text-lg md:text-xl mb-8"
    >
      Zero-plastic weddings & events with reusable products,
      trained volunteers, and sustainable practices.
    </motion.p>

      <div className="flex justify-center gap-5">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[#0F0E47] px-8 py-3 rounded-full font-semibold
            shadow-md hover:scale-105 transition-all duration-300 ease-out"
        >
          Get Started
        </button>

        <a
          href="#about"
          className="px-8 py-3 rounded-full font-semibold border border-white/50
            hover:bg-white/90 hover:text-[#0F0E47]
            transition-all duration-300 ease-out"
        >
          Learn More
        </a>
      </div>

    </div>
  </motion.section>
</header>

 

      {/* ================= ABOUT ================= */}
      <section id="about" className="bg-white text-[#0F0E47] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Why This System Exists
            </h2>
            <p className="text-[#0F0E47]/70 mb-6 leading-relaxed">
              Millions of meals are wasted daily while many communities face
              food insecurity. This system bridges that gap by responsibly
              connecting surplus food sources with verified receivers.
            </p>
            <p className="text-[#0F0E47]/70 leading-relaxed">
              Every donation is guided by safety checks, volunteer coordination,
              and ethical distribution practices.
            </p>
          </div>

          <div className="bg-[#0F0E47] text-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Core Principles</h3>
            <ul className="space-y-3 text-white/90">
              <li>✔ Human dignity above all</li>
              <li>✔ Zero compromise on food waste</li>
              <li>✔ Transparent delivery process</li>
              <li>✔ Community-driven support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= DONATION SAFETY ================= */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-10">
            Donation Safety Standards
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-16">
            Food safety is non-negotiable. Donations are accepted only when
            all essential safety conditions are met.
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              "Freshly prepared",
              "Untouched food",
              "Hygienically packed",
              "Normal smell & appearance",
              "Adequate quantity",
            ].map((item, i) => (
              <div key={i} className="bg-white text-[#0F0E47] rounded-2xl p-6 shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0F0E47] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/10 rounded-2xl p-6 max-w-3xl mx-auto">
            ✔ If all conditions are satisfied → Food can be donated  
            <br />
            ✖ If any one condition failed → Donation is respectfully declined
          </div>
        </div>
      </section>

      {/* ================= WHERE FOOD GOES ================= */}
      <section className="bg-white text-[#0F0E47] py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Responsible Distribution
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Old Age Homes",
                desc: "Delivered through registered caretakers",
              },
              {
                title: "Orphanages",
                desc: "Handled with child-safe standards",
              },
              {
                title: "Shelter Homes",
                desc: "Coordinated with verified NGOs",
              },
            ].map((place) => (
              <div
                key={place.title}
                className="border border-[#0F0E47]/20 rounded-2xl p-10"
              >
                <h3 className="text-2xl font-bold mb-4">{place.title}</h3>
                <p className="text-[#0F0E47]/70">{place.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-12">
            Our Social Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "1000+", label: "Meals Saved" },
              { stat: "150+", label: "Active Volunteers" },
              { stat: "50+", label: "Partner Institutions" },
              { stat: "Zero", label: "Safety Compromises" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-2xl p-10">
                <h3 className="text-3xl font-extrabold">{item.stat}</h3>
                <p className="text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section className="bg-white text-[#0F0E47] py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12">
            Get Involved
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                role: "Donor",
                desc: "Share surplus food responsibly",
              },
              {
                role: "Volunteer",
                desc: "Assist in coordination & delivery",
              },
              {
                role: "Receiver",
                desc: "Request food with dignity",
              },
            ].map((item) => (
              <div key={item.role} className="border rounded-2xl p-10 flex flex-col">
                <h3 className="text-xl font-bold mb-4">{item.role}</h3>
                <p className="text-[#0F0E47]/70 mb-6">{item.desc}</p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-auto bg-[#0F0E47] text-white py-3 rounded-full"
                >
                  Continue as {item.role}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0b0a3a] py-10 text-center text-white/70">
        <p>© {new Date().getFullYear()} SustainApp</p>
        <p className="text-sm mt-2">
          Ethical redistribution • Safety first • Community driven
        </p>
      </footer>

    </div>
  );
}
