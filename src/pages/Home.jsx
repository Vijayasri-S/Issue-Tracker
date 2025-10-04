import React from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Portal</h1>
      <div className="flex flex-row gap-4">
        <HomeNavbar className="flex-col" />
    </div>
    </div>
  );
}

export default Home;
