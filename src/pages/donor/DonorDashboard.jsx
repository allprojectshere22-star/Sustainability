import React, { useEffect, useState } from "react";
import { FiTrash, FiEdit, FiSave, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function DonorDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [donations, setDonations] = useState([]);
  const [food, setFood] = useState({
    title: "",
    quantity: "",
    expiry: "",
    location: "",
  });

  // modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    loadProfile();
    loadDonations();
  }, []);

  /* ================= LOAD PROFILE ================= */
  const loadProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setProfile(res.data);
    } catch {
      navigate("/login", { replace: true });
    }
  };

  /* ================= LOAD DONATIONS ================= */
  const loadDonations = async () => {
    const res = await api.get("/donor/donations");
    setDonations(res.data || []);
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    const res = await api.put("/auth/update-profile", {
      name: profile.name,
      contact: profile.contact,
      location: profile.location,
    });
    setProfile(res.data);
    setEditing(false);
  };

  /* ================= DELETE DONATION ================= */

  const openDeleteModal = (donation) => {
    setSelectedDonation(donation);
    setShowDeleteModal(true);
  };


const confirmDelete = async () => {
  if (!selectedDonation) return;

  const id = selectedDonation.id;

  try {
    await api.delete(`/donations/${id}`);

    setDonations((prev) => prev.filter((d) => d.id !== id));

    setShowDeleteModal(false);
    setSelectedDonation(null);

  } catch (err) {
    console.error("Delete failed:", err.response?.data || err);
  }
};


  /* ================= SUBMIT DONATION ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/donations", {
      title: food.title,
      quantity: food.quantity,
      pickupDate: food.expiry,
      location: food.location,
    });

    setFood({ title: "", quantity: "", expiry: "", location: "" });
    loadDonations();

    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0F0E47] p-8 space-y-8 relative">

      {/* 🎉 SUCCESS MODAL */}
      {showSuccessModal && <SuccessModal />}

      {/* 🗑️ DELETE CONFIRM MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[360px] text-center">
            <h3 className="text-lg font-bold mb-2 text-[#0F0E47]">
              Delete Donation?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <b>{selectedDonation?.title}</b>?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* PROFILE */}
        <div className="bg-white rounded-2xl p-6 shadow relative">
          <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
            Donor Profile
          </h2>

          {profile ? (
            <div className="space-y-2 text-sm">
              {editing ? (
                <>
                  <Input label="Name" value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  <Input label="Contact" value={profile.contact || ""}
                    onChange={(e) => setProfile({ ...profile, contact: e.target.value })} />
                  <Input label="Location" value={profile.location || ""}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })} />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveProfile}
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

        {/* DONATE FOOD */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
            Donate Food
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <Input label="Food Name" value={food.title}
              onChange={(e) => setFood({ ...food, title: e.target.value })} />
            <Input label="Quantity" type="number" value={food.quantity}
              onChange={(e) => setFood({ ...food, quantity: e.target.value })} />
            <Input label="Pickup Date & Time" type="datetime-local" value={food.expiry}
              onChange={(e) => setFood({ ...food, expiry: e.target.value })} />
            <Input label="Pickup Location" value={food.location}
              onChange={(e) => setFood({ ...food, location: e.target.value })} />

            <button className="md:col-span-2 bg-[#0F0E47] text-white py-3 rounded-xl font-bold">
              Submit Donation
            </button>
          </form>
        </div>
      </div>

{/* HISTORY */}
<div className="bg-white rounded-2xl p-6 shadow">
  <h2 className="text-xl font-bold mb-4 text-[#0F0E47]">
    My Donation History
  </h2>

  {donations.length === 0 ? (
    <p className="text-gray-500">No donations yet.</p>
  ) : (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b text-left text-gray-600">
          <th className="py-3">Food</th>
          <th>Quantity</th>
          <th>Pickup Date</th>
          <th>Location</th>
          <th>Status</th>
          <th>Approved By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {donations.map((d) => (
          <tr key={d.id} className="border-b">
            <td className="py-2 font-semibold">{d.title}</td>
            <td>{d.quantity}</td>
            <td>{new Date(d.pickup_date).toLocaleString()}</td>
            <td>{d.location}</td>

            <td
              className={
                d.status === "approved"
                  ? "text-green-600 font-semibold"
                  : "text-orange-500 font-semibold"
              }
            >
              {d.status}
            </td>

            <td>
              {d.status === "approved"
                ? d.receiver_name || "-"
                : "-"}
            </td>

            <td>
              {d.status === "pending" && (
                <button
                  onClick={() => openDeleteModal(d)}
                  className="text-red-600"
                >
                  <FiTrash />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
}

/* ================= SUCCESS MODAL ================= */
function SuccessModal() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-2 text-[#0F0E47]">
          🎉 Donation Submitted!
        </h2>
        <p className="text-gray-600">Thank you for helping others 💙</p>
      </div>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold block mb-1">{label}</label>
      <input {...props} required className="w-full border rounded-xl p-3" />
    </div>
  );
}
