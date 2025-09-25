import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${apiUrl}/api/images`);
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black p-6 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        🖼️ Image Gallery
      </h1>
      {images.length === 0 ? (
        <p className="text-center text-gray-400">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 transform transition hover:scale-105"
            >
              <img
                src={img.url}
                alt="Locked"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <p className="text-lg font-semibold">
                  Price: ₹{img.price}
                </p>
                <button
                  className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                  onClick={() => alert("Go to image link to purchase")}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
