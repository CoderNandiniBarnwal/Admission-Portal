import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useAdmissionContext } from "../context/AdmissionContext";
import DeleteAdmission from "./DeleteAdmission";
import EditAdmission from "./EditAdmission";

function ShowAdmission() {
  const {
    course,
    address,
    phone,
    admission,
    setAdmission,
    setIsDltAdmissionOpen,
    setIsEditAdmissionOpen,
    setSelectedId,
    setEditCourse,
    setEditAddress,
  } = useAdmissionContext();

  const fetchadmission = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/admission/getAllAdmission",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setAdmission(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    fetchadmission();
  }, []);

  const handleUpdate = (id, course, address) => {
    setSelectedId(id);
    setEditCourse(course);
    setEditAddress(address);
    setIsEditAdmissionOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsDltAdmissionOpen(true);
  };

  return (
    <>
      <div className="bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          All Students Admission
        </h2>

        {admission.length === 0 && (
          <p className="text-center text-gray-500">No admission found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {admission?.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              <img
                src={item?.userId?.picture}
                alt={item?.userId?.userName}
                className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover mb-3"
              />

              <h3 className="text-lg font-semibold">
                {item?.userId?.userName}
              </h3>

              <p className="text-gray-500 text-sm">{item?.userId?.email}</p>
              <p className="text-gray-500 text-sm">
                Phone: {item?.userId?.phone}
              </p>
              <p className="text-gray-500 text-sm">Course:{item?.course}</p>
              <p className="text-gray-500 text-sm">Address: {item?.address}</p>

              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium">
                  Admission:{" "}
                  <span className="text-blue-600 font-semibold">
                    {item?.status || "Pending"}
                  </span>
                </p>

                <p className="text-sm font-medium">
                  Payment:{" "}
                  <span className="text-green-600 font-semibold">
                    {item?.paymentStatus || "Not Paid"}
                  </span>
                </p>
              </div>

              <div className="flex gap-4 mt-5 w-full justify-center">
                <button
                  onClick={() =>
                    handleUpdate(item._id, item.course, item.address)
                  }
                  className="p-3 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition active:scale-95 shadow-md"
                >
                  <FaUserEdit size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition active:scale-95 shadow-md"
                >
                  <MdDeleteForever size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteAdmission />
      <EditAdmission />
    </>
  );
}

export default ShowAdmission;
