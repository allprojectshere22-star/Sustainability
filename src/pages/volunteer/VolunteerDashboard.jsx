import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import api from "../../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function VolunteerDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
  });

  /* ================= FETCH USER ================= */
  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name || "",
          contact: res.data.contact || "",
          location: res.data.location || "",
        });
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/volunteer/dashboard");
      setStats(res.data.stats);
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboard();
  }, [user]);

  const safeStats = stats || { completed: 0, active: 0, rejected: 0 };

  const updateAssignment = async (id, action) => {
    await api.post(`/volunteer/assignments/${id}/${action}`);
    fetchDashboard();
  };

  const saveProfile = async () => {
    const res = await api.put("/auth/update-profile", form);
    setUser(res.data);
    setEditing(false);
  };

  /* ================= ACTIVE RECEIVER ================= */
  const activeAssignment = assignments.find(
    (a) => a.status === "ACTIVE" || a.status === "COMPLETED"
  );

  const receiver =
    activeAssignment?.receiver || {
      name: activeAssignment?.receiver_name,
      email: activeAssignment?.receiver_email,
      contact: activeAssignment?.receiver_contact,
      location: activeAssignment?.receiver_location,
    };

  const chartData = [
    { name: "Completed", value: safeStats.completed },
    { name: "Active", value: safeStats.active },
    { name: "Rejected", value: safeStats.rejected },
  ];

  if (!user || loading) return null;

  return (
    <div className="min-h-screen bg-[#0F0E47] p-8 space-y-8">

      <div className="grid md:grid-cols-4 gap-8">

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">

          {/* ===== VOLUNTEER PROFILE ===== */}
          <div className="bg-white rounded-2xl p-6 shadow relative">
            <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
              Volunteer Profile
            </h2>

            <div className="space-y-2 text-sm">
              {editing ? (
                <>
                  <Input label="Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Input label="Contact" value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                  <Input label="Location" value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} />

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={saveProfile}
                      className="bg-[#0F0E47] text-white px-4 py-2 rounded-xl flex items-center gap-1"
                    >
                      <FiSave /> Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-200 px-4 py-2 rounded-xl flex items-center gap-1"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p><b>Name:</b> {user.name}</p>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Contact:</b> {user.contact || "-"}</p>
                  <p><b>Location:</b> {user.location || "-"}</p>

                  <button
                    onClick={() => setEditing(true)}
                    className="absolute top-4 right-4 flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ===== RECEIVER PROFILE (ONLY WHEN ASSIGNED) ===== */}
          {receiver?.name && (
            <div className="bg-white rounded-2xl p-6 shadow border-l-4 border-green-600">
              <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
                Receiver Profile
              </h2>

              <div className="space-y-2 text-sm">
                <p><b>Name:</b> {receiver.name}</p>
                <p><b>Email:</b> {receiver.email || "-"}</p>
                <p><b>Contact:</b> {receiver.contact || "-"}</p>
                <p><b>Location:</b> {receiver.location || "-"}</p>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <section className="md:col-span-3 space-y-6">

          {/* ===== STATS ===== */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-center font-bold text-lg mb-4 text-[#0F0E47]">
              Volunteer Statistics
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {chartData.map((s) => (
                <div key={s.name} className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== IMPACT OVERVIEW ===== */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-center font-bold text-lg mb-4 text-[#0F0E47]">
              Impact Overview
            </h3>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===== ASSIGNMENTS ===== */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-center font-bold text-lg mb-4 text-[#0F0E47]">
              Assignments
            </h3>

            {assignments.length === 0 ? (
              <p className="text-center text-gray-500">
                No assignments yet.
              </p>
            ) : (
              assignments.map((a) => (
                <div key={a.id} className="border rounded-xl p-4 mb-4">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {a.quantity}
                  </p>

                  {a.status === "NEW" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateAssignment(a.id, "accept")}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateAssignment(a.id, "reject")}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {a.status === "ACTIVE" && (
                    <button
                      onClick={() => updateAssignment(a.id, "complete")}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Mark Completed
                    </button>
                  )}

                  {a.status === "COMPLETED" && (
                    <span className="text-green-600 font-semibold">
                      ✔ Completed
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold block mb-1">{label}</label>
      <input {...props} className="w-full border rounded-xl p-3" />
    </div>
  );
}
