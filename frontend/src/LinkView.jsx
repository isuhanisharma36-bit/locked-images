// frontend/src/LinkView.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function LinkView() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/image/${id}`
        );
        setImage(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handlePay = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/pay/${id}`
      );
      const { key, amount, orderId } = res.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Locked Images",
        description: "Unlock your image",
        order_id: orderId,
        handler: function () {
          alert("Payment successful! ✅");
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  if (!image) {
    return (
      <div className="text-center text-gray-600 mt-20">Loading image...</div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        Unlock Image 🔒
      </h2>
      <p className="mb-4 text-gray-700">Price: ₹{image.price}</p>

      <button
        onClick={handlePay}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Pay & Unlock
      </button>
    </div>
  );
}
