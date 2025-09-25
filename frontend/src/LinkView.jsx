import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function LinkView() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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
        name: "Locked Image",
        description: "Unlock this image",
        order_id: res.data.orderId,
        handler: function () {
          setUnlocked(true);
        },
        theme: {
          color: "#FACC15", // Tailwind yellow-400
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
        <p className="text-white text-xl animate-pulse">⏳ Loading...</p>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600">
        <p className="text-white text-xl">❌ Image not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6"
    >
      <h2 className="text-3xl font-bold mb-6">🔒 Locked Image</h2>

      {!unlocked ? (
        <div className="bg-black/30 p-6 rounded-xl shadow-lg text-center space-y-4">
          <p className="text-lg">This image is locked.</p>
          <p className="font-bold text-yellow-300 text-xl">
            💰 Price: ₹{image.price}
          </p>
          <button
            onClick={handlePayment}
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition"
          >
            💳 Pay & Unlock
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${image.filename}`}
            alt="Unlocked"
            className="rounded-xl shadow-lg max-w-lg"
          />
          <p className="mt-4 text-yellow-300">✅ Image unlocked!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
