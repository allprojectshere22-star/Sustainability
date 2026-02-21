import { useNavigate } from "react-router-dom";

export default function VolunteerSetup() {
  const navigate = useNavigate();

  const handleCreate = () => {
    const roles = JSON.parse(localStorage.getItem("roles")) || [];
    if (!roles.includes("volunteer")) {
      roles.push("volunteer");
      localStorage.setItem("roles", JSON.stringify(roles));
    }
    localStorage.setItem("activeRole", "volunteer");
    navigate("/volunteer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Become a Volunteer 🤝</h1>
        <button
          onClick={handleCreate}
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
        >
          Create Volunteer Profile
        </button>
      </div>
    </div>
  );
}
