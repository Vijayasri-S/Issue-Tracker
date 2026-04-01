import React, { useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
function Feedback() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback:", message);
    alert("Feedback submitted!");
    setMessage("");
  };

  return (
    <div className="p-8 w-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Portal</h1>
      <HomeNavbar className="w-full" />
      <h1 className="text-2xl font-bold m-4 text-center">Submit Feedback</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
        <textarea
          placeholder="Your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-800 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
