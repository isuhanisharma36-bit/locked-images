import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const handleUpload = async () => {
    if (!file || !price) {
      alert("Please select a file and enter price");
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
      alert("Upload failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Upload & Lock Image 🔒
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Price in INR"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Upload & Generate Link
      </button>

      {link && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">Share this link:</p>
          <a
            href={link}
            className="text-indigo-600 font-bold break-all hover:underline"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
