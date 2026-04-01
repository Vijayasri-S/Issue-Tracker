import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

function AdminDashboard() {
  // Simulating admin department
  const adminDept = "Technical"; 

  const [tickets, setTickets] = useState([
    { id: 1, title: "Wifi not working", status: "Pending", department: "Technical" },
    { id: 2, title: "Projector issue", status: "Accepted", department: "Technical" },
    { id: 3, title: "Lab system crash", status: "In Progress", department: "Lab" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id ? { ...ticket, status: newStatus } : ticket
    ));
  };

  const filteredTickets = tickets.filter(t => t.department === adminDept);

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Portal</h1>
      <AdminNavbar />
      <div className="shadow border border-gray-300 rounded p-4 bg-white max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Department Complaints ({adminDept})</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => (
              <tr key={t.id}>
                <td className="border p-2">{t.id}</td>
                <td className="border p-2">{t.title}</td>
                <td className="border p-2">{t.status}</td>
                <td className="border p-2">
                  <select
                    value={t.status}
                    onChange={(e) => handleStatusChange(t.id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option>Pending</option>
                    <option>Accepted</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
