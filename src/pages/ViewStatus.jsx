import React from "react";
import HomeNavbar from "../components/HomeNavbar";
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "in progress":
      return "bg-orange-500";
    case "rejected":
      return "bg-red-500";
    case "completed":
      return "bg-green-700";
    default:
      return "bg-gray-500";
  }
}

function ViewStatus() {
  const dummyTickets = [
    { id: 1, title: "Wifi not working", status: "Pending" ,issueType:"Technical",severity:"High"},
    { id: 2, title: "Library AC broken", status: "Resolved", issueType:"Maintenance", severity:"Medium" },
    { id: 3, title: "Cafeteria food quality", status: "In Progress", issueType:"Service", severity:"Low" },
    { id: 4, title: "Hostel Room Leak", status: "Accepted", issueType:"Infrastructure", severity:"High" },
    { id: 5, title: "Classroom Projector Issue", status: "Rejected", issueType:"Technical", severity:"Medium" },
    { id: 6, title: "Gym Equipment Maintenance", status: "Completed", issueType:"Maintenance", severity:"Low" },
  ];

  return (
    <div className="p-8 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Portal</h1>
      <HomeNavbar/>
      <br />  
      <div className="shadow border border-gray-500 p-4 rounded bg-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Complaint Status</h1>
      <table className="table-fixed border-collapse border border-gray-400 w-full max-w-4xl mx-auto overflow-x-auto">
        <thead>
      <tr>
        <th className="border border-gray-400 p-2">ID</th>
        <th className="border border-gray-400 p-2">Title</th>
        <th className="border border-gray-400 p-2">Status</th>
        <th className="border border-gray-400 p-2">Issue Type</th>
        <th className="border border-gray-400 p-2">Severity</th>
      </tr>
    </thead>
    <tbody>
      {dummyTickets.map(ticket => (
        <tr key={ticket.id}>
          <td className="border border-gray-400 p-2">{ticket.id}</td>
          <td className="border border-gray-400 p-2">{ticket.title}</td>
          <td className="border border-gray-400 p-2 min-w-[20px] items-center">
            <span
              className={`inline-block items-center px-1 py-1 text-white max-w-[80px] text-sm rounded ${getStatusColor(
                ticket.status
              )}`}
            >
              {ticket.status}
            </span>
          </td>
          <td className="border border-gray-400 p-2">{ticket.issueType}</td>
          <td className="border border-gray-400 p-2">{ticket.severity}</td>
        </tr>
      ))}
    </tbody>
      </table>
    </div>
    </div>
);

}

export default ViewStatus;
