import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaRecycle, FaPhoneAlt } from "react-icons/fa";

import HERO_BG from "../assets/hero-bg.jpg";
import contain from "../assets/contain.png";
import clothbag from "../assets/cloth bag.png";
import Cups from "../assets/cups.png";
import Uten from "../assets/uten.png";
import Thank from "../assets/thank.png";
import Choco from "../assets/choco.png";
import Trays from "../assets/trays.png";
import Cards from "../assets/card.png";

/* =========================
   REUSABLE PRODUCTS COMPONENT 
========================= */
const ReusableProducts = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const products = [
    { title: "Eco-Friendly Containers", desc: "Single-use containers to reduce plastic usage.", img: contain },
    { title: "Cloth Bags", desc: "Durable bags for keeping the gifts.", img: clothbag },
    { title: "Serving Utensils", desc: "Clean, reusable utensils for meals.", img: Uten },
    { title: "Plant Based Chocolates", desc: "Plant-based chocolates wrapped in reusable fabric.",img: Choco },
    { title: "Reusable Cups", desc: "Eco-friendly cups for beverages.", img: Cups },
    { title: "Lunch Trays", desc: "Bagasse (sugarcane) organized trays for serving meals.", img: Trays },
    { title: "Eco-Friendly Favor Boxes", desc: "Sustainable wedding giveaways.", img: Thank },
    { title: "Thank You Cards", desc: "Plantable cards that grow into plants.", img:Cards },
  ];

  return (
    <>
      <div className="bg-white rounded-3xl p-12 shadow-xl mb-24">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-[#0F0E47]">
          Reusable Products We Provide
        </h2>

        <p className="text-[#0F0E47]/80 text-center max-w-3xl mx-auto mb-12">
          We provide high-quality, eco-friendly products that help reduce waste and
          make food distribution safe and convenient <b>Contact Us to Order</b>.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-[#0F0E47] text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col"
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  onClick={() => setSelectedImage(item.img)}
                  className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
                />
              </div>

              <div className="flex flex-col items-center text-center px-4 py-4">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
};



export default function GreenEvent() {
   const [showPopup, setShowPopup] = useState(false);

   const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const packages = [
    {
      name: "Basic Green Ceremony",
      price: "Budget Friendly",
      desc: "Perfect for small weddings & engagements",
      items: [
        "Reusable plates & cups",
        "5 trained volunteers",
        "Waste segregation support",
      ],
    },
    {
      name: "Eco Wedding Starter",
      price: "Standard",
      desc: "Traditional weddings with eco decor",
      items: [
        "Eco-friendly decor setup",
        "Reusable dining products",
        "10 trained volunteers",
      ],
    },
    {
      name: "Premium Green Wedding",
      price: "Popular",
      desc: "Large weddings with full eco support",
      items: [
        "Eco mandap decor",
        "20 trained volunteers",
        "Complete cleanup & recycling",
      ],
    },
    {
      name: "Luxury Sustainable Wedding",
      price: "Premium",
      desc: "High-end zero plastic weddings",
      items: [
        "Custom eco theme & decor",
        "30 trained volunteers",
        "Post-event sustainability report",
      ],
    },
    {
      name: "Green Party & Reception",
      price: "Flexible",
      desc: "Eco-friendly receptions & private parties",
      items: [
        "Reusable drinkware & cutlery",
        "15 trained volunteers",
        "Eco lighting & setup",
      ],
    },
    {
      name: "Corporate / Community Events",
      price: "Custom",
      desc: "Conferences, public & community events",
      items: [
        "Eco stalls & banners",
        "Waste audit & impact tracking",
        "Volunteer coordination & reporting",
      ],
    },
  ];

  // JSX goes here

  return (
    <div className="bg-[#0F0E47] text-white">
      {/* HERO */}
 {/* HERO */}
<header
  className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${HERO_BG})` }}
>
  <div className="text-center px-6 max-w-4xl">

    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-5xl md:text-6xl font-extrabold mb-6"
    >
      Eco Events
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="max-w-3xl mx-auto text-white/90 text-lg md:text-xl mb-8"
    >
      Zero-plastic weddings & events with reusable products,
      trained volunteers, and sustainable practices.
    </motion.p>

    {/* TRUST / VALUE POINTS */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center gap-6 text-white/90 text-sm md:text-base mb-10"
    >
    </motion.div>

    {/* CTA */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center gap-4"
    >
      <a
        href="#packages"
        className="bg-white text-[#0F0E47] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-white/90 transition"
      >
        View Packages
      </a>

      <a
        href="#contact"
        className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition"
      >
        Contact Us
      </a>
    </motion.div>

  </div>
</header>


      {/* WHAT IS GREEN EVENT */}
      <section className="bg-white text-[#0F0E47] py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Is a Green Event?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl shadow bg-white">
            <FaRecycle size={30} />
            <h3 className="font-bold mt-4">Reusable Products</h3>
            <p className="text-sm mt-2">
              Plates, cups, décor & banners reused responsibly.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow bg-white">
            <FaUsers size={30} />
            <h3 className="font-bold mt-4">Trained Volunteers</h3>
            <p className="text-sm mt-2">
              Volunteers guide guests & manage waste.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow bg-white">
            <FaLeaf size={30} />
            <h3 className="font-bold mt-4">Zero Plastic Goal</h3>
            <p className="text-sm mt-2">
              Complete plastic-free event execution.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages"  className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Green Event Packages
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white text-[#0F0E47] rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-sm mt-2">{pkg.desc}</p>
              <p className="mt-3 font-semibold text-green-700">
                {pkg.price}
              </p>

              <ul className="mt-4 space-y-1 text-sm">
                {pkg.items.map((item, idx) => (
                  <li key={idx}>✔ {item}</li>
                ))}
              </ul>

              <a href="#contact"><button className="mt-6 w-full bg-[#0F0E47] text-white py-2 rounded-lg">
               Contact Us
              </button></a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REUSABLE PRODUCTS */}
      <ReusableProducts />

      {/* HOW IT WORKS SECTION - HORIZONTAL CARDS */} 
      <div className="max-w-6xl mx-auto px-6 mb-24">
</div>

      <div className="bg-[#0F0E47] text-white rounded-3xl p-12 shadow-xl mb-24"> 
        <h2 className="text-4xl font-bold text-center mb-10"> How It Works </h2>
         <p className="text-white/80 text-center max-w-3xl mx-auto mb-10"> Sharing and receiving food is simple, safe, and responsible. Follow these easy steps: </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
             {[ { title: "Sign Up", desc: "Create your account quickly and get verified." }, 
              { title: "Request Products", desc: "Choose the reusable products you need." }, 
              { title: "Receive & Use", desc: "Products are delivered or picked up, ready to use." },
               { title: "Return / Reuse", desc: "After use, products are returned or reused." }, 
               { title: "Share Food", desc: "Prepare and share meals safely with the community." }, 
               { title: "Track Impact", desc: "See how your contributions help feed more people." }, 
               { title: "Volunteer Help", desc: "Join volunteers for deliveries and support." },
                { title: "Give Feedback", desc: "Share your experience to improve the program." }, ].map((item, index) =>
                 ( <div key={index} className="bg-white border border-[#0F0E47]/20 rounded-xl p-6 text-center shadow hover:shadow-lg transition" > 
                 <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0F0E47] text-white flex items-center justify-center font-bold text-lg"> {index + 1} </div>
                  <h4 className="font-bold text-[#0F0E47] mb-2">{item.title}</h4> <p className="text-sm text-[#0F0E47]/70">{item.desc}</p> </div> ))} 
                  </div> 
                  </div>

      {/* CONTACT */}
      
<section id="contact" className="bg-white text-[#0F0E47] py-24 px-6">
  <h2 className="text-4xl font-extrabold text-center mb-14">Contact Us</h2>

  <div className="max-w-2xl mx-auto bg-[#0F0E47] px-14 py-14 rounded-3xl shadow-2xl">
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(form.phone.trim()))
          newErrors.phone = "Phone must be 10 digits";
        if (!form.eventType.trim())
          newErrors.eventType = "Event type is required";
        if (!form.date) newErrors.date = "Date is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length) return;

        setLoading(true);
        try {
          const res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

          const data = await res.json();

          if (data.success) {
            setSubmitted(true);
            setShowPopup(true);
            setForm({
              name: "",
              phone: "",
              eventType: "",
              date: "",
              message: "",
            });
          } else {
            alert("Failed to submit form");
          }
        } catch (err) {
          alert("Server error: " + err.message);
        }
        setLoading(false);
      }}
    >
      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`w-full p-5 rounded-2xl ${
            errors.name ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={`w-full p-5 rounded-2xl ${
            errors.phone ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* ✅ Event Type DROPDOWN */}
      <div>
        <select
          value={form.eventType}
          onChange={(e) => setForm({ ...form, eventType: e.target.value })}
          className={`w-full p-5 rounded-2xl bg-white ${
            errors.eventType ? "border-2 border-red-500" : ""
          }`}
        >
          <option value="">Select Event Type</option>
          <option value="Basic Green Ceremony">Basic Green Ceremony</option>
          <option value="Eco Wedding Starter">Eco Wedding Starter</option>
          <option value="Premium Green Wedding">Premium Green Wedding</option>
          <option value="Luxury Sustainable Wedding">
            Luxury Sustainable Wedding
          </option>
          <option value="Green Party & Reception">
            Green Party & Reception
          </option>
          <option value="Corporate / Community Events">
            Corporate / Community Events
          </option>
        </select>

        {errors.eventType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.eventType}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className={`w-full p-5 rounded-2xl ${
            errors.date ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      {/* Message */}
      <textarea
        rows="4"
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full p-5 rounded-2xl"
      />

      <p className="text-sm text-white/70 text-center">
        Marriage & event details will be discussed in person
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-[#0F0E47] py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 shadow-lg hover:bg-white/90"
      >
        <FaPhoneAlt />
        {loading ? "Submitting..." : "Request Consultation"}
      </button>
    </form>
  </div>

  {/* POPUP MODAL */}
  {showPopup && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white text-[#0F0E47] w-[90%] max-w-md rounded-2xl p-6 relative shadow-2xl">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-xl font-bold hover:text-red-600"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-3">Request Submitted</h3>
        <p className="text-sm text-[#0F0E47]/80 mb-4">
          Thank you for contacting us. Our team will get in touch with you shortly.
        </p>

        <button
          onClick={() => setShowPopup(false)}
          className="w-full bg-[#0F0E47] text-white py-2 rounded-xl font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  )}
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

