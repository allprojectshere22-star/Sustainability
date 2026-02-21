import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import socket from "./socket";

import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import OfflinePage from "./components/OfflinePage";
import useOnlineStatus from "./hooks/useOnlineStatus";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import AboutPage from "./pages/AboutPage";
import FoodManagementPage from "./pages/FoodManagementPage";
import GreenEventsPage from "./pages/GreenEventsPage";

import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import DonorDashboard from "./pages/donor/DonorDashboard";
import ReceiverDashboard from "./pages/receiver/ReceiverDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  const location = useLocation();
  const isOnline = useOnlineStatus();

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 AUTH HYDRATION */
  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
      setLoading(false);
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  /* 🔔 SOCKET (ONLY AFTER LOGIN) */
  useEffect(() => {
    if (!token) return;

    socket.connect();
    return () => socket.disconnect();
  }, [token]);

  /* 🌐 OFFLINE */
  if (!isOnline) return <OfflinePage />;

  if (loading) return null;

  return (
    <>
      <ScrollToTop />

      {/* ✅ NAVBAR RULE (SIMPLE & CORRECT) */}
      {!token ? <Navbar /> : <DashboardNavbar />}

      <div className="pt-20" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/food-management" element={<FoodManagementPage />} />
        <Route path="/green-events" element={<GreenEventsPage />} />

        {/* AUTH */}
        <Route
          path="/login"
          element={token ? <Navigate to={`/${role}`} replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to={`/${role}`} replace /> : <Register />}
        />

        {/* DASHBOARDS */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute allowedRole="volunteer">
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRole="donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receiver"
          element={
            <ProtectedRoute allowedRole="receiver">
              <ReceiverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>403 Unauthorized</h1>} />
      </Routes>
    </>
  );
}
