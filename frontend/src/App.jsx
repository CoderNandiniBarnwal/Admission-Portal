import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/Register";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./components/Verify";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AdmissionForm from "./components/AdmissionForm";
import { AdmissionProvider } from "./context/AdmissionContext";
import ShowAdmission from "./components/ShowAdmission";
import Footer from "./components/Footer";
import DeleteAdmission from "./components/DeleteAdmission";
import Payment from "./components/Payment";

export default function App() {
  return (
    <UserProvider>
      <AdmissionProvider>
        <BrowserRouter>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/admissionform" element={<AdmissionForm />} />
            <Route path="/showadmissionform" element={<ShowAdmission />} />
            <Route path="/footer" element={<Footer/>}/>
            <Route path="/deleteadmission" element={<DeleteAdmission/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
        </BrowserRouter>
      </AdmissionProvider>
    </UserProvider>
  );
}
