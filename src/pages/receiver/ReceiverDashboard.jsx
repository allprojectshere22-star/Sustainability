import React, { useEffect, useState } from "react";
import { FiEdit, FiSave, FiX, FiCheck, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function ReceiverDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // decline modal
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    loadProfile();
    loadPending();
    loadHistory();
  }, []);

  /* ================= LOADERS ================= */

  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
    } catch {
      navigate("/login", { replace: true });
    }
  };

  const loadPending = async () => {
    try {
      const res = await api.get("/donations/pending");
      setPending(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

const loadHistory = async () => {
  try {
    const res = await api.get("/donations/history");
    setHistory(res.data || []);
  } catch (err) {
    console.error(err);
  }
};


  /* ================= PROFILE ================= */

  const saveProfile = async () => {
    try {
      setLoading(true);
      const res = await api.put("/auth/update-profile", {
        name: profile.name,
        contact: profile.contact,
        location: profile.location,
      });
      setProfile(res.data);
      setEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DONATION ACTIONS ================= */

  const accept = async (id) => {
    try {
      await api.post(`/donations/${id}/approve`);
      loadPending();
      loadHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const openDeclineModal = (donation) => {
    setSelectedDonation(donation);
    setShowDeclineModal(true);
  };

  const confirmDecline = async () => {
    // ✅ optimistic UI update (remove immediately)
    setPending((prev) =>
      prev.filter((d) => d.id !== selectedDonation.id)
    );

    setShowDeclineModal(false);
    setSelectedDonation(null);

    // 🔕 silently call backend (no popup even if it fails)
    try {
      await api.post(`/donations/${selectedDonation.id}/decline`);
    } catch (err) {
      console.error("Decline failed silently:", err);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-[#0F0E47] p-8 space-y-8">

      {success && (
        <div className="fixed top-5 right-5 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50">
          Profile updated!
        </div>
      )}

      {/* TOP GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* PROFILE */}
        <div className="bg-white rounded-2xl p-6 shadow relative">
          <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
            Receiver Profile
          </h2>

          {profile ? (
            <div className="space-y-2 text-sm">
              {editing ? (
                <>
                  <Input label="Name" value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                  <Input label="Contact" value={profile.contact || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, contact: e.target.value })
                    }
                  />
                  <Input label="Location" value={profile.location || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                  />

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={saveProfile}
                      disabled={loading}
                      className="bg-[#0F0E47] text-white py-2 px-4 rounded-xl flex items-center gap-1"
                    >
                      <FiSave /> Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-200 py-2 px-4 rounded-xl flex items-center gap-1"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p><b>Name:</b> {profile.name}</p>
                  <p><b>Email:</b> {profile.email}</p>
                  <p><b>Contact:</b> {profile.contact || "-"}</p>
                  <p><b>Location:</b> {profile.location || "-"}</p>

                  <button
                    onClick={() => setEditing(true)}
                    className="absolute top-4 right-4 text-[#0F0E47] flex items-center gap-1"
                  >
                    <FiEdit /> Edit
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>

        {/* PENDING */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
            Pending Donations
          </h2>

          {pending.length === 0 ? (
            <p className="text-gray-500">No pending requests 🎉</p>
          ) : (
            pending.map((d) => (
              <div key={d.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-semibold">{d.title}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {d.quantity} | {d.location}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => accept(d.id)}
                    className="bg-[#0F0E47] text-white px-4 py-2 rounded-xl flex items-center gap-1"
                  >
                    <FiCheck /> Accept
                  </button>
                  <button
                    onClick={() => openDeclineModal(d)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-1"
                  >
                    <FiXCircle /> Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

     {/* HISTORY */}
<div className="bg-white rounded-2xl p-6 shadow">
  <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
    My Donation History
  </h2>

  {history.length === 0 ? (
    <p className="text-gray-500">No history yet.</p>
  ) : (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-left text-gray-600">
          <th className="py-3">Food</th>
          <th>Quantity</th>
          <th>Donor</th>
          <th>Pickup Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {history.map((h) => (
          <tr key={h.id} className="border-b">
            <td className="py-2 font-semibold">{h.title}</td>
            <td>{h.quantity}</td>
            <td>{h.donor_name}</td>
            <td>{new Date(h.pickup_date).toLocaleString()}</td>
            <td
              className={
                h.status === "approved"
                  ? "text-green-600 font-semibold"
                  : "text-gray-600 font-semibold"
              }
            >
              {h.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


      {/* DECLINE MODAL */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[360px] text-center">
            <h3 className="text-lg font-bold mb-2 text-[#0F0E47]">
              Decline Donation?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to decline{" "}
              <b>{selectedDonation?.title}</b>?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDecline}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Yes, Decline
              </button>
              <button
                onClick={() => setShowDeclineModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
