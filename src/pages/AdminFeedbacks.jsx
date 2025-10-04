import React from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminFeedbacks() {
  const feedbacks = [
    "Improve hostel maintenance.",
    "Cafeteria needs more hygiene.",
    "Wi-Fi disconnects frequently.",
  ];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Portal</h1>
      <AdminNavbar />
      <div className="shadow border border-gray-300 rounded p-4 bg-white max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Student Feedbacks</h2>
        <ul className="space-y-3">
          {feedbacks.map((f, i) => (
            <li key={i} className="border p-3 rounded bg-gray-50">{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminFeedbacks;
