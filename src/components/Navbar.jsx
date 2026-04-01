import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 p-4 m-1 text-white flex justify-between">
      <div className="font-bold text-lg">University Portal</div>
      <div className="space-x-4">
        <Link to="/register/student" className="hover:underline">Student Register</Link>
        <Link to="/register/admin" className="hover:underline">Admin Register</Link>
      </div>
    </nav>
  );
}
