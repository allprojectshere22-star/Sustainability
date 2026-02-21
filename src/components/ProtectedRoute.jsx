import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔒 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role restricted
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
