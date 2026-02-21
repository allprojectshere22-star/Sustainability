import {
  Leaf,
  Heart,
  Globe,
  Users,
  Recycle,
  Handshake,
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

import HERO_BG from "../assets/hero-bg.jpg";
import Counter from "../components/Counter";

// Team Images
import Sandra from "../assets/sandra.jpeg";
import Harini from "../assets/harini.jpeg";
import Soice from "../assets/soice.png";
import Belsi from "../assets/belsi.jpeg";
import Lydi from "../assets/lydi.jpeg";
import Hemsa from "../assets/hemsa.jpg";
import Fedo from "../assets/fedo.jpeg";
import afrine from "../assets/afrine.jpeg";
import Reena from "../assets/reena.jpeg";
import Pooja from "../assets/pooja.jpg";
import Jani from "../assets/jani.jpg";

// Gallery Images
import Food from "../assets/food.png";
import Wedding from "../assets/wedding.png";
import Vol from "../assets/vol.png";
import Certi from "../assets/certi.png";
import Aware from "../assets/aware.png";
import Delivery from "../assets/delivery.png";

/* -------------------------
   STATS
-------------------------- */
const stats = [
  { label: "Food Saved (kg)", value: 9540, icon: Recycle },
  { label: "Volunteers", value: 274, icon: Users },
  { label: "Green Events", value: 312, icon: Globe },
  { label: "Plastic Reduced (kg)", value: 213, icon: ShieldCheck },
  { label: "Communities Connected", value: 120, icon: Handshake },
  { label: "Deliveries Completed", value: 995, icon: Heart },
];

/* -------------------------
   TEAM
-------------------------- */
const team = [
  {
    name: "Fedora",
    role: "CEO & Founder",
   bio: "Leads the organization with a strong vision for sustainability, community impact, and zero-waste event management.",
    image:Fedo,
  },
  {
    name: "Harini",
    role: "Co Founder & CTO",
    bio: "Oversees the technical development of the platform, ensuring secure systems, scalability, and smooth user experience.",
    image: Harini,
  },
  {
    name: "Lydi",
    role: "Volunteer Engagement Coordinator",
    bio: "Keeps volunteers motivated and engaged through communication, guidance, and ongoing support.",
    image: Lydi,
  },
  {
    name: "Belsi",
    role: "Event Sustainability Planner",
    bio: "Plans and implements eco-friendly strategies to minimize waste and ensure sustainable event practices.",
    image: Belsi,
  },
  {
    name: "Hemsaa",
    role: "Technical Administrator",
    bio: "Maintains system performance, manages access control, and ensures uninterrupted technical operations.",
    image: Hemsa,
  },
  {
    name: "Soice",
    role: "Community Outreach Manager",
    bio: "Builds relationships with communities and organizations to expand outreach, awareness, and participation.",
    image: Soice,
  },
  {
    name: "Sandra",
    role: "Food Safety & Quality Supervisor",
    bio: "Ensures all food donations meet hygiene, safety, and quality standards before distribution.",
    image: Sandra,
  },
  {
    name: "Jani",
    role: "Volunteer Coordination Lead",
    bio: "Manages volunteer recruitment, training, and coordination to ensure smooth execution of events.",
    image: Jani,
  },
  {
    name: "Afrine",
    role: "Marketing & Communications Lead",
    bio: "Handles branding, promotions, and communication strategies to spread awareness of sustainability initiatives.",
    image: afrine,
  },
  {
    name: "Poosa",
    role: "Field Operations Executive",
    bio: "Oversees on-ground logistics, coordination, and real-time execution of events and food distribution.",
    image: Pooja,
  },
  {
    name: "Reena",
    role: "Sustainability Compliance Officer",
    bio: "Ensures all operations follow environmental regulations and maintain strict sustainability standards.",
    image: Reena,
  },
];

/* -------------------------
   VALUES
-------------------------- */
const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "We design systems that reduce environmental footprint.",
  },
  {
    icon: Heart,
    title: "Empathy & Community",
    description: "We bring people together to help each other.",
  },
  {
    icon: Globe,
    title: "Global Mindset",
    description: "We aim to scale sustainable solutions globally.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Strong partnerships drive our mission.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "We build trust with secure and open systems.",
  },
  {
    icon: Users,
    title: "Inclusiveness",
    description: "Everyone can contribute to sustainability.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-[#0F0E47]">
      {/* HERO */}
      <header
        className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            About SustainApp
          </h1>
          <p className="text-blue-100 mt-6 max-w-2xl mx-auto">
            Empowering communities with data-driven sustainability solutions.
          </p>
        </div>
      </header>

      {/* COUNTERS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-14">
            Our Impact in Numbers
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {stats.map((stat, i) => (
              <Counter key={i} {...stat} Icon={stat.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="py-24 bg-[#0F0E47] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Mission in Action</h2>
          <p className="text-white/80 mb-14">
            Real impact through food rescue, green events, and volunteers.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[Food, Wedding, Vol, Delivery, Aware, Certi].map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-3xl shadow-xl h-64 w-full object-cover"
                alt="gallery"
              />
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-blue-50/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-14">Meet Our Team</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((m, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-6"
                />
                <h3 className="font-bold text-xl">{m.name}</h3>
                <p className="text-sm opacity-70">{m.role}</p>
                <p className="text-sm mt-3">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-[#0F0E47] text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-14">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-2xl">
                <v.icon className="w-10 h-10 mb-4" />
                <h3 className="font-bold text-xl mb-2">{v.title}</h3>
                <p className="text-white/80">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="py-24 bg-white text-[#0F0E47]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-[#0F0E47]/70 max-w-2xl mx-auto mb-14">
            Reach out to us for sustainable event planning, volunteering
            opportunities, partnerships, or general support.
          </p>

          {/* COMMON CONTACT */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-3 bg-[#0F0E47] px-8 py-4 rounded-full border">
              <Mail className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                sustainapp@gmail.com
              </span>
            </div>
            <p className="text-[#0F0E47]/80 mt-4">
              Common contact email for all general inquiries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
            {/* EVENT PLANNER */}
            <div className="bg-[#0F0E47] p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Event Planner Contact
              </h3>
              <div className="space-y-5 text-white/90">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <span>eventssustainapp@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>+91 98765 43210 (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span>+91 44 2654 7890 (Landline)</span>
                </div>
              </div>
            </div>

            {/* VOLUNTEER LEAD */}
            <div className="bg-[#0F0E47] p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Volunteer Lead Contact
              </h3>
              <div className="space-y-5 text-white/90">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <span>volunteerssustainapp@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>+91 91234 56789 (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <span>+91 44 2654 1234 (Landline)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0b0a3a] py-10 text-center text-white/70">
        <p>© {new Date().getFullYear()} SustainApp</p>
        <p className="text-sm mt-2">
          Ethical redistribution • Safety first • Community driven
        </p>
      </footer>
    </div>
  );
}
