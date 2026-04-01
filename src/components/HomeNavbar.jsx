import { Link } from "react-router-dom";

export default function HomeNavbar() {
  return (
     <div className="p-4"> {/* gives space around everything */}
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Welcome to My Portal
      </h1>

    <nav className="bg-blue-600 m-0 p-3 text-white flex justify-evenly items-center rounded-md">
      <div className="space-x-4 flex flex-row justify-evenly items-center text-center">
        <Link to="/view-status" className=" text-center hover:underline">View Status</Link>
        <Link to="/submit-complaint" className="hover:underline">Submit Complaint</Link>
        <Link to="/feedback" className="hover:underline">Feedback</Link>
      </div>
    </nav>
    </div>
  );
}