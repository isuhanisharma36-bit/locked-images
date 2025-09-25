// frontend/src/Upload.jsx
import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image first");
      return;
    }
    alert(`Pretend we upload: ${file.name} with price $${price}`);
    // 🔗 Later we will connect this to your backend API
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Locked Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price (USD)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 2.99"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
