import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiBell, FiX } from "react-icons/fi";
import io from "socket.io-client";
import Profile from "../assets/profile.png";
import api from "../api";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const role = user?.role;
  const userId = user?.id;

  /* ===================== FETCH AUTH USER ====================== */
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.clear();
        window.dispatchEvent(new Event("auth-change"));
        navigate("/login");
      });
  }, [navigate]);

  /* ===================== SOCKET + NOTIFICATIONS ====================== */
  useEffect(() => {
    if (!userId) return;

    api
      .get("/notifications")
      .then((res) => setNotifications(res.data))
      .catch(console.error);

    const socket = io("http://localhost:5000", {
      auth: { token: localStorage.getItem("token") },
    });

    socket.emit("join", `user_${userId}`);

    socket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => socket.disconnect();
  }, [userId]);

  const unreadCount = notifications.filter(
    (n) => n && n.is_read === 0
  ).length;

  /* ===================== MARK ALL READ ====================== */
  const markAllRead = async () => {
    try {
      await api.post("/notifications/mark-all-read");
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Mark all read failed:", err);
    }
  };

  /* ===================== LOGOUT ====================== */
  const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  /* ===================== NAVLINK STYLE ====================== */
  const linkClass = ({ isActive }) =>
    `px-3 py-2 font-medium ${
      isActive
        ? "text-[#0F0E47] underline underline-offset-8"
        : "text-[#0F0E47] hover:opacity-70"
    }`;

  const allLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Green Events", path: "/green-events" },
    { name: "Volunteer", path: "/volunteer", roles: ["volunteer"] },
    { name: "Donor", path: "/donor", roles: ["donor"] },
    { name: "Receiver", path: "/receiver", roles: ["receiver"] },
    { name: "Admin", path: "/admin", roles: ["admin"] },
  ];

  const visibleLinks = allLinks.filter(
    (l) => !l.roles || l.roles.includes(role)
  );

  if (!user) return null;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div
            className="text-xl font-bold cursor-pointer text-[#0F0E47]"
            onClick={() => navigate("/")}
          >
            SustainApp
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6">
            {visibleLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-5">

            {/* ================= NOTIFICATIONS ================= */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)}>
                <FiBell className="text-2xl text-[#0F0E47]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
                  <div className="flex justify-between items-center p-3 border-b">
                    <span className="font-semibold">Notifications</span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={markAllRead}
                        className="text-xs text-blue-600"
                      >
                        Mark all read
                      </button>
                      <button
                        onClick={() => setNotifOpen(false)}
                        className="text-gray-500 hover:text-black"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-sm border-b ${
                            !n.is_read ? "bg-blue-50" : ""
                          }`}
                        >
                          {n.message}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= PROFILE + NAME ================= */}
            <div
              className="flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              onClick={() => setSideOpen(true)}
            >
              <img
                src={Profile}
                className="w-9 h-9 rounded-full border"
                alt="Profile"
              />
              <span className="text-sm font-medium text-[#0F0E47]">
                {user?.name}
              </span>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-[#0F0E47] text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>
    </>
  );
}
