//UserProfile.jsx

import React from "react";
import { useUserContext } from "../context/UserContext";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserProfile() {
  const { user, setUser } = useUserContext();

  const [editable, setEditable] = useState(false);

  const [userName, setuserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(user?.picture || "");
  const [file, setFile] = useState(null);

  console.log("Username:", userName);
  console.log("email:", email);
  console.log("phone:", phone);
  console.log("picture:", picture);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  async function handleSave() {
    try {
      const formData = new FormData();

      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("phone", phone);
      if (password) {
        formData.append("password", password);
      }

      console.log("FormData:", userName, email, phone, file, password);
      if (file) {
        formData.append("picture", file);
      }

      const response = await axios.put(
        `http://localhost:8001/user/updateUser/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setEditable(false);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        setFile(null);
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error("Error updating profile");
    }
  }

  return (
    <div className="relative max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <div className="w-[126px] h-[126px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <img
            src={picture}
            alt={picture.name}
            className="h-full rounded-full"
          />
        </div>
      </div>
      <button
        className="absolute top-[120px] left-[240px]"
        onClick={() => setEditable(!editable)}
      >
        <FaPencilAlt className="text-4xl" />
      </button>

      {editable && (
        <div className="mb-4 absolute top-[80px] left-[170px]">
          <input type="file" className=" w-full" onChange={handleFileChange} />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          value={userName}
          disabled={!editable}
          onChange={(e) => setuserName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="text"
          value={email}
          disabled={!editable}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">phone</label>
        <input
          type="text"
          value={phone}
          disabled={!editable}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        disabled={!editable}
        className={`border-2 py-1 px-4 rounded text-2xl font-bold 
    ${
      editable
        ? "text-white bg-green-400 border-green-600 hover:text-green-400 hover:bg-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default UserProfile;
