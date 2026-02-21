import React from "react";
import offlineImg from "../assets/offline.png"; 
import "./offline.css";

export default function OfflinePage() {
  return (
    <div className="offline-container">
      <img
        src={offlineImg}   // ✅ USE IMPORTED IMAGE
        alt="Offline"
        className="offline-image"
      />
      <p>
        No internet right now.<br />
        Please check your connection 💙
      </p>
    </div>
  );
}
