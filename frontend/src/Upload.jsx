// frontend/src/Upload.jsx
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
      setLink(`${window.location.origin}/view?id=${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-6 text-purple-600">
        Upload & Lock Image
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 w-full border rounded-lg px-3 py-2"
      />

      <input
        type="number"
        placeholder="Price in INR"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-4 w-full border rounded-lg px-3 py-2"
      />

      <button
        onClick={handleUpload}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full hover:bg-purple-700 transition"
      >
        Upload
      </button>

      {link && (
        <div className="mt-6">
          <p className="text-gray-700 mb-2">Share this link:</p>
          <a
            href={link}
            className="text-indigo-600 font-semibold underline break-all"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
