import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Base API URL from .env
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !price) {
      setMessage("Please select an image and enter a price");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("price", price);

      const res = await fetch(`${API}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Uploaded successfully! Image ID: ${data.id}`);
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      setMessage("❌ Upload failed: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Upload Image
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Enter price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
