import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const imageId = searchParams.get("id");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/images/${imageId}`);
        setImageUrl(res.data.imageUrl);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };
    if (imageId) fetchImage();
  }, [imageId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-green-400 mb-4">✅ Payment Successful!</h1>
      <p className="text-lg mb-6">Your image is now unlocked 🎉</p>

      {imageUrl ? (
        <div className="flex flex-col items-center">
          <img src={imageUrl} alt="Unlocked" className="rounded-lg shadow-lg max-w-md mb-4" />
          <a
            href={imageUrl}
            download
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
          >
            Download Image
          </a>
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
