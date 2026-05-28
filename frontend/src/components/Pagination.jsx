import React from "react";
import { useAdmissionContext } from "../context/AdmissionContext";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Pagination() {
  const { currentPage, setCurrentPage, totalPages, setTotalPages,admission,setAdmission } =
    useAdmissionContext();

  const fetchProduct = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/admission/paginateAdmission?page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setTotalPages(response.data.totalPages);
      setAdmission(response.data.data);
      // setCurrentPage(response.data.currentPage);
    } catch (error) {
      // console.log("RESPONSE ERROR:", error.response);
      // toast.error(error.response?.data?.message || "Error fetching products");

      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR MESSAGE:", error.message);

      toast.error(error.message || "Error fetching products");
    }
  };
  useEffect(() => {
    fetchProduct(currentPage);
  }, [currentPage]);
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className="bg-red-500 text-white px-5 py-2 rounded-l-full font-semibold hover:bg-red-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="bg-yellow-300 text-black px-6 py-2 h-[40px] flex items-center justify-center font-medium">
        {currentPage} of {totalPages}
      </div>

      <button
        className="bg-green-500 text-white px-5 py-2 rounded-r-full font-semibold hover:bg-green-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() =>
          setCurrentPage((prev) => (prev < totalPages ? prev + 1 : totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
