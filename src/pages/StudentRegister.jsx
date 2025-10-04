import React from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentRegister() {
  const [selectedDept, setSelectedDept] = React.useState("CSE");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home"); // go to home after registration
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Student Register</h1>
        <input type="text" placeholder="User Name" className="w-full p-2 mb-3 border rounded" required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" required />
         <input type="text" placeholder="FullName" className="w-full p-2 mb-3 border rounded" required />
          <select value={selectedDept} onChange={e=>setSelectedDept(e.target.value)} className="w-full p-2 mb-3 border rounded" required>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option> 
              <option value="MECH">MECH</option> 
              <option value="IT">IT</option>
              <option value="AML">AML</option>
              <option value="ADS">ADS</option>
              <option value="CHEM">CHEM</option>
            </select>
             <input placeholder="Roll Number" className="w-full p-2 mb-3 border rounded" required />
        <button className="w-full bg-blue-600 text-white p-2 rounded mb-3">Register</button>
        <p className="text-sm text-center">
          Already have an account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentRegister;
