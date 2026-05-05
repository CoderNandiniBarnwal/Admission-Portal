import React from "react";
import { useUserContext } from "../context/UserContext";
import { useAdmissionContext } from "../context/AdmissionContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdmissionForm(){
  const { user } = useUserContext();
  const { course, setCourse, address, setAddress } = useAdmissionContext();
  const navigate = useNavigate();

  const handleAdmission = async() => {
    try {
        const response=await axios.post(`http://localhost:8001/admission/applyAdmission/${user._id}`,{course,address},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },);
        setAddress("");
        setCourse("");
        navigate("/");
        
    } catch (error) {
        toast.error(error.response?.data.message || error.message);
              console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 md:p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Admission Form
        </h1>

        {/* Profile */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.picture}
            alt={user?.userName}
            className="w-24 h-24 rounded-full border-4 border-red-500 object-cover shadow-md"
          />
          <p className="mt-3 text-lg font-semibold text-gray-700">
            {user?.userName}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            value={user?.userName || ""}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 outline-none"
          />

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 outline-none"
          />

          <input
            type="text"
            value={user?.phone || ""}
            readOnly
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 outline-none"
          />

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select Course</option>
            <option value="MERN Stack">MERN Stack</option>
            <option value="Java Full Stack">Java Full Stack</option>
            <option value="Python">Python</option>
          </select>

          <textarea
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
            rows="4"
          ></textarea>

          <button
            onClick={handleAdmission}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
          >
            Apply Admission
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdmissionForm;