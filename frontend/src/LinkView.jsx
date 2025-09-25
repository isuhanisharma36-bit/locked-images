import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LinkView() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/image/${id}`
        );
        setImage(res.data);
      } catch (err) {
        console.error(err);
        alert("Image not found");
      }
    };
    fetchImage();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/pay/${id}`
      );

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.orderId,
        name: "Locked Images",
        description: "Unlock your image",
        handler: function () {
          setUnlocked(true);
        },
        theme: { color: "#4F46E5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (!image) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Unlock Image 🔑
      </h2>

      {!unlocked ? (
        <div className="text-center">
          <p className="mb-4 text-lg font-medium">
            Pay ₹{image.price} to unlock this image.
          </p>
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Pay & Unlock
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 font-medium">Here’s your unlocked image 🎉</p>
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${image.filename}`}
            alt="Unlocked"
            className="rounded-lg shadow-md mx-auto"
          />
        </div>
      )}
    </div>
  );
}
