import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_API_URL; // ✅ Backend URL from .env

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/images`);
        setImages(res.data); // expecting array of { url, price }
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xl font-semibold">
        ⏳ Loading Gallery...
      </div>
    );
  }

  return (
    <div className="py-16 px-8 text-center">
      <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">
        ✨ Our Gallery
      </h2>

      {images.length === 0 ? (
        <p className="text-lg text-white">No images uploaded yet 🚀</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={img.url}
                alt={`Gallery ${index}`}
                className="w-full h-64 object-cover"
              />
              <p className="mt-2 text-yellow-300 font-semibold">
                Price: ₹{img.price}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
