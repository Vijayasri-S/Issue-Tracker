import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminRegister() {
  const [selectedDept, setSelectedDept] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home"); // go to home after registration
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Register</h1>
        <input type="text" placeholder="User Name" className="w-full p-2 mb-3 border rounded" required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" required />
         <input type="text" placeholder="FullName" className="w-full p-2 mb-3 border rounded" required />
         <input type="text" placeholder="Admin ID" className="w-full p-2 mb-3 border rounded" required />
          <select value={selectedDept} onChange={e=>setSelectedDept(e.target.value)} className="w-full p-2 mb-3 border rounded" required>
            <option value="" disabled>Department</option>
              <option value="ClassRooms">ClassRooms</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Labs">Labs</option>
              <option value="Hostel">Hostel</option>
              <option value="Food">Food</option>
              <option value="WaterSupply">WaterSupply</option>
              <option value="PowerSupply">PowerSupply</option>
              <option value="Technical">Technical</option>
              <option value="Placement">Placement</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
             <input placeholder="Designation" className="w-full p-2 mb-3 border rounded" required />
        <button className="w-full bg-blue-600 text-white p-2 rounded mb-3">Register</button>
        <p className="text-sm text-center">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminRegister;
