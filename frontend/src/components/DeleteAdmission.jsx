import React from "react";
import { useAdmissionContext } from "../context/AdmissionContext";
import { toast } from "react-toastify";
import axios from "axios";

function DeleteAdmission() {
  const {
    isDltAdmissionOpen,
    setIsDltAdmissionOpen,
    selectedId,
    admission,
    setAdmission,
  } = useAdmissionContext();

  async function deleteItem(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8001/admission/deleteAdmission/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      const updatedList = admission.filter((item) => item._id !== id);
      setAdmission(updatedList);

      toast.success("Student data deleted successfully");
      setIsDltAdmissionOpen(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {isDltAdmissionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-2">Are you sure?</h2>

            <p className="text-gray-600 mb-5">
              You want to delete this product?
            </p>

            <div className="flex justify-between px-6">
              <button
                onClick={() => setIsDltAdmissionOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteItem(selectedId)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAdmission;
