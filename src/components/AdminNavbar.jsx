import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-3 rounded-md flex justify-around items-center">
      <Link to="/admin-dashboard" className="hover:underline">Complaints</Link>
      <Link to="/admin-feedbacks" className="hover:underline">Feedbacks</Link>
    </nav>
  );
}
