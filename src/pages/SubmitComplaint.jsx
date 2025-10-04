import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";

function SubmitComplaint() {
  const [form, setForm] = useState({ title: "", description: "", severity: "", department: "", category: "", issue_type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint submitted:", form);
    alert("Complaint submitted!");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Portal</h1>
      <HomeNavbar />
      <br />
      <h1 className="text-2xl font-bold mb-4 text-center">Submit Complaint</h1>
      <form onSubmit={handleSubmit} className="shadow border-2 p-10 flex flex-col gap-3 w-full p-100 mx-auto items-center">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 border rounded w-full" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 border rounded w-full" required />
        <label>Severity</label><input type="range"name="severity" value={form.severity} onChange={handleChange} min="0" max="5" className="p-2 border rounded text-transparent w-full"/>
       <select value={form.department} name="department" onChange={handleChange} className="p-2 border rounded w-full" required>
              <option value="" disabled>Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option> 
              <option value="MECH">MECH</option> 
              <option value="IT">IT</option>
              <option value="AML">AML</option>
              <option value="ADS">ADS</option>
              <option value="CHEM">CHEM</option>
            </select>
            <select name="issue_type" value={form.issue_type} onChange={handleChange} className="p-2 border rounded w-full">
              <option value="" disabled>Issue Type</option>
              {
                ["Classroom", "Infrastructure","labs", "Hostel","food","Water Supply","Power Supply","placement","peers", "Transport", "Other"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))
              }
            </select>
        
        <button type="submit" className="bg-blue-600 w-full text-white p-2 rounded mt-2">Submit</button>
      </form>
    </div>
  );
}

export default SubmitComplaint;
