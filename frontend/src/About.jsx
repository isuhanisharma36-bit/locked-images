import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-12"
    >
      <div className="max-w-2xl bg-black/40 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">ℹ️ About LockedImages</h1>
        <p className="text-lg leading-relaxed mb-6">
          <span className="font-semibold text-yellow-300">LockedImages</span> is a
          simple platform where you can upload an image, set a price, and share
          it with others. The recipient must pay via{" "}
          <span className="font-semibold">Razorpay</span> before unlocking the
          image. 💳
        </p>
        <p className="text-md text-gray-200">
          This project was built with <strong>React + Vite</strong> on the
          frontend, <strong>Express.js</strong> on the backend,{" "}
          <strong>Cloudinary</strong> for image storage, and{" "}
          <strong>Razorpay</strong> for payments.
        </p>
      </div>
    </motion.div>
  );
}
