import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const handleUpload = async () => {
    if (!file || !price) {
      alert("⚠️ Please select a file and enter price");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("price", price);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLink(`${window.location.origin}/l/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed, please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">📤 Upload & Lock Image</h2>

      {/* File input */}
      <div>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-200 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-yellow-400 file:text-black
                     hover:file:bg-yellow-300"
        />
      </div>

      {/* Price input */}
      <div>
        <input
          type="number"
          placeholder="Price in INR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-lg text-black text-lg outline-none 
                     focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg 
                   hover:bg-yellow-300 transition"
      >
        🚀 Upload & Generate Link
      </button>

      {/* Share link */}
      {link && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-black/30 rounded-xl shadow-lg"
        >
          <p className="mb-2">✅ Share this link:</p>
          <a
            href={link}
            className="text-yellow-300 font-semibold hover:underline break-all"
          >
            {link}
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}
