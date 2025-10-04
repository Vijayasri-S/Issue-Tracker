import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./pages/Login";
import StudentRegister from "./pages/StudentRegister";
import AdminRegister from "./pages/AdminRegister";
//import RegisterLanding from "./pages/RegisterLanding";
import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import ViewStatus from "./pages/ViewStatus";
import Feedback from "./pages/Feedback";
import Navbar from "./components/Navbar";
import HomeNavbar from "./components/HomeNavbar";

function AppWrapper() {
  const location = useLocation();

  const showNavbar = location.pathname.startsWith("/register");
  const showHomeNavbar = location.pathname.startsWith("/home") || location.pathname.startsWith("/submit-complaint") || location.pathname.startsWith("/view-status") || location.pathname.startsWith("/feedback");
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/submit-complaint" element={<SubmitComplaint />} />
        <Route path="/view-status" element={<ViewStatus />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
      </>

  );
}
export default function App(){
return (
    <Router>
      <AppWrapper />
    </Router>
  );
}