import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { user } = useUserContext();
  const userId = user?._id;
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [loading, setLoading] = useState(false);

  const payNow = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:8001/payment/payNow/${userId}`,
        { cardNumber },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.info("Please wait for 10 seconds...");

      let time = 10;
      setCountdown(time);

      const timer = setInterval(() => {
        time--;
        setCountdown(time);

        if (time === 0) {
          clearInterval(timer);

          toast.success(response.data.message);
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
      console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-5 text-red-600">
          Payment Form
        </h2>
        {countdown !== null && (
          <p className="text-center text-blue-600 font-bold mb-3">
            Processing... {countdown}s
          </p>
        )}

        <input
          type="number"
          placeholder="Enter Card Number"
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-red-400"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <input
          type="number"
          value={1300}
          readOnly
          className="w-full border p-3 rounded-lg mb-4 bg-gray-100 text-gray-600"
        />

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          onClick={payNow}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
