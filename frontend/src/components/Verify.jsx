//Login.jsx

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

function Verify() {
  const { email, setEmail, otp, setOtp } = useUserContext();

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();    

    try {
      const response = await axios.post("http://localhost:8001/user/verify", {
        email,
        otp,
      });
      console.log(response.data);

      if (response.data.success) {
        setEmail("");
        setOtp("");

        toast.success("User Verified successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify Email OTP
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleVerify}>
            
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit" onClick={handleVerify}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verify;
