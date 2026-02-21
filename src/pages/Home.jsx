import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "../ui/Features";
import Testimonials from "../ui/Testimonials";
import HowItWorks from "../ui/HowItWorks";
import HERO_BG from "../assets/hero-bg.jpg"; 
import { FaHome } from "react-icons/fa";

export default function Home() {
  const colors = {
    dark: "#0F0E47",
    white: "#FFFFFF",
  };

  const parallaxRef = useRef(null);

  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    const update = () => {
      el.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };

    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="min-h-screen bg-blue-900">

      <header
        className="relative overflow-hidden h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        {/* BLUE DARK OVERLAY #34542C */}
        <div className="absolute inset-0 bg-[rgba(0,40,100,0.55)] backdrop-brightness-[1] z-0"></div>

        <motion.div
          ref={parallaxRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center md:justify-between">

            {/* LEFT CONTENT — shifted right */}
            <div className="space-y-8 md:text-left pl-10 md:pl-20"> 
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                Sustainability Management System
              </h1>

              <p className="text-white/90 text-lg md:text-xl font-light max-w-xl">
                Food rescue, green events, and volunteer coordination all in one powerful platform for a greener future.
              </p>

              <div className="flex flex-wrap gap-6">
                <Link
                  to="/food-management"
                  className="px-8 py-4 rounded-full font-semibold bg-white text-[#0F0E47] hover:scale-105 transition-all shadow-lg"
                >
                  Food Donation
                </Link>

                <Link
                  to="/green-events"
                  className="px-8 py-4 rounded-full font-semibold bg-white text-[#0F0E47] hover:scale-105 transition-all shadow-lg"
                >
                 Eco Events
                </Link>
                
              </div>
            </div>

            {/* RIGHT CARD — unchanged */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md mx-auto relative z-10"
            >
              <h3 className="text-[#0F0E47] text-xl font-bold mb-6 text-center">Our Impact</h3>

              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-4xl font-extrabold text-[#0F0E47]">9,540 kg</div>
                  <p className="text-sm font-medium text-[#0F0E47] opacity-70">Food Saved</p>
                </div>

                <div>
                  <div className="text-4xl font-extrabold text-[#0F0E47]">274</div>
                  <p className="text-sm font-medium text-[#0F0E47] opacity-70">Volunteers</p>
                </div>

                <div>
                  <div className="text-4xl font-extrabold text-[#0F0E47]">312</div>
                  <p className="text-sm font-medium text-[#0F0E47] opacity-70">Events</p>
                </div>

                <div>
                  <div className="text-4xl font-extrabold text-[#0F0E47]">213</div>
                  <p className="text-sm font-medium text-[#0F0E47] opacity-70">Plastic Reduced(kg)</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </header>

      {/* FEATURES (White & Dark Blue text) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <Features colors={colors} />
        </div>
      </section>

      {/* HOW IT WORKS (Dark Blue bg & White text) */}
      <section className="py-20" style={{ backgroundColor: colors.dark }}>
        <div className="container mx-auto px-6 text-white">
          <HowItWorks colors={colors} />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-8 text-[#0F0E47]">
            What People Say
          </h3>
          <Testimonials colors={colors} />
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24" style={{ backgroundColor: colors.dark }}>
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm font-semibold select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Join the Movement
          </div>

          <h2
            className="text-6xl font-serif font-bold leading-tight mb-6"
            style={{ color: colors.white }}
          >
            Ready to Make <br /> a Difference?
          </h2>

          <p className="text-white/70 text-lg mb-12 max-w-3xl mx-auto">
            Join thousands of donors, receivers, and volunteers already building a more sustainable future. Start your journey today.
          </p>

          <div className="flex justify-center gap-6">
            <Link
              to="/donor"
              className="px-12 py-4 rounded-full bg-white text-[#0F0E47] font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              Become a Volunteer →
            </Link>

            <Link
              to="/login"
              className="px-12 py-4 rounded-full border border-white/50 text-white font-semibold text-lg hover:bg-white hover:text-[#0F0E47] transition-colors"
            >
              Donate Food
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-[#0F0E47] py-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#0F0E47] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a4 4 0 014-4h12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">SSMS</h3>
              <p className="text-sm max-w-xs leading-relaxed text-[#0F0E47]">
                Smart Sustainability Management System – Building greener communities through technology and collaboration.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#0F0E47]">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#0F0E47]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 4H8m8-8H8m-4 0a4 4 0 018 0m-8 0v8" />
                  </svg>
                  <span>sustainapp@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#0F0E47]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7-5 7 5M5 13h14v7H5z" />
                  </svg>
                  <span>+91 9856789660</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-[#0F0E47]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a7 7 0 017 7c0 7-7 13-7 13s-7-6-7-13a7 7 0 017-7z" />
                  </svg>
                  <span>Green City, Eco State</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-[#0F0E47]">Platform</h4>
              <ul className="space-y-2 text-sm text-[#0F0E47]">
                <li><Link to="#" className="hover:underline">Features</Link></li>
                <li><Link to="#" className="hover:underline">Pricing</Link></li>
                <li><Link to="#" className="hover:underline">How It Works</Link></li>
                <li><Link to="#" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-[#0F0E47]">Company</h4>
              <ul className="space-y-2 text-sm text-[#0F0E47]">
                <li><Link to="#" className="hover:underline">About Us</Link></li>
                <li><Link to="#" className="hover:underline">Blog</Link></li>
                <li><Link to="#" className="hover:underline">Careers</Link></li>
                <li><Link to="#" className="hover:underline">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-[#0F0E47]">Resources</h4>
              <ul className="space-y-2 text-sm text-[#0F0E47]">
                <li><Link to="#" className="hover:underline">Documentation</Link></li>
                <li><Link to="#" className="hover:underline">API</Link></li>
                <li><Link to="#" className="hover:underline">Support</Link></li>
                <li><Link to="#" className="hover:underline">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-4 text-[#0F0E47]">Legal</h4>
              <ul className="space-y-2 text-sm text-[#0F0E47]">
                <li><Link to="#" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="#" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-[#E1E1E1]" />

          <div className="flex flex-col md:flex-row justify-between text-sm text-[#6B72A9] gap-4 md:gap-0">
            <p>© 2025 Smart Sustainability Management System. All rights reserved.</p>
            <div className="space-x-6">
              <Link to="#" className="hover:underline">Privacy</Link>
              <Link to="#" className="hover:underline">Terms</Link>
              <Link to="#" className="hover:underline">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
