import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LinkView() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

  // Load image details from backend
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`${API}/api/image/${id}`);
        const data = await res.json();
        if (res.ok) {
          setImage(data);
        } else {
          setMessage("❌ Image not found");
        }
      } catch (err) {
        setMessage("❌ Error fetching image: " + err.message);
      }
      setLoading(false);
    };

    fetchImage();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await fetch(`${API}/api/pay/${id}`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ Payment init failed");
        return;
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: "Locked Image",
        description: "Unlock image after payment",
        handler: function () {
          setUnlocked(true);
          setMessage("✅ Payment successful! Image unlocked.");
        },
        theme: { color: "#4f46e5" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!image) {
    return <p className="text-center mt-10 text-red-500">{message}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">Locked Image</h2>

        {unlocked ? (
          <img
            src={image.url}
            alt="Unlocked"
            className="rounded-lg shadow-md mb-4"
          />
        ) : (
          <div className="mb-4">
            <div className="w-64 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
              🔒 Locked
            </div>
            <p className="mt-2">Pay ₹{image.price} to unlock</p>
          </div>
        )}

        {!unlocked && (
          <button
            onClick={handlePayment}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Pay & Unlock
          </button>
        )}

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
