import React from "react";
import { useAdmissionContext } from "../context/AdmissionContext";
import axios from "axios";
import { toast } from "react-toastify";

function EditAdmission() {
  const {
    isEditAdmissionOpen,
    setIsEditAdmissionOpen,
    editAddress,
    setEditAddress,
    editCourse,
    setEditCourse,
    selectedId,
    admission,
    setAdmission,
  } = useAdmissionContext();

  const handleEdit = async (id) => {
    try {
      console.log("Token:", localStorage.getItem("accessToken"));

      const response = await axios.put(
        `http://localhost:8001/admission/updateAdmission/${id}`,
        {
          course: editCourse,
          address: editAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      setAdmission(
        admission.map((item) =>
          item._id === id
            ? {
                ...item,
                ...response.data.data,
                userId: item.userId,
              }
            : item,
        ),
      );
      setIsEditAdmissionOpen(false);
      console.log(response.data);

      toast.success("User admission form updated successfully");
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };

  return (
    <>
      {isEditAdmissionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 md:p-8">
            <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
              Edit Admission
            </h1>

            <div className="space-y-4">
              <select
                value={editCourse}
                onChange={(e) => setEditCourse(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select Course</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="Java Full Stack">Java Full Stack</option>
                <option value="Python">Python</option>
              </select>

              <textarea
                placeholder="Enter Address"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                rows="4"
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-red-400"
              ></textarea>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setIsEditAdmissionOpen(false)}
                  className="w-1/2 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
                >
                  Cancel
                </button>

                <button
                  className="w-1/2 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                  onClick={() => handleEdit(selectedId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditAdmission;
