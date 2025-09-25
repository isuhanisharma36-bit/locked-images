import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !price) {
      alert("⚠️ Please select a file and enter a price");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("price", price);

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLink(`${window.location.origin}/l/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-12"
    >
      <div className="bg-black/40 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6">📤 Upload & Lock Image</h2>

        {/* File input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-300 
                     file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 
                     file:text-sm file:font-semibold 
                     file:bg-yellow-400 file:text-black 
                     hover:file:bg-yellow-300 mb-4"
        />

        {/* Price input */}
        <input
          type="number"
          placeholder="Enter price in INR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-lg text-black mb-4"
        />

        {/* Upload button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition"
        >
          {loading ? "⏳ Uploading..." : "🚀 Upload & Lock"}
        </motion.button>

        {/* Share link */}
        {link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-green-500/20 rounded-lg"
          >
            <p className="text-lg mb-2">✅ Share this link:</p>
            <a
              href={link}
              className="text-yellow-300 font-semibold break-words hover:underline"
            >
              {link}
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
