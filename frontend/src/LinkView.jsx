import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LinkView() {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/images/${id}`);
        setImageUrl(res.data.imageUrl);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };
    fetchImage();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment`, {
        amount: 5000, // amount in paise (₹50)
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "Locked Images",
        description: "Unlock your image",
        order_id: res.data.id,
        handler: function (response) {
          // Redirect to success page after payment
          window.location.href = "/success";
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366f1",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Unlock Image 🔒</h1>

      <button
        onClick={handlePayment}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-500 transition"
      >
        Pay ₹50 to Unlock
      </button>
    </div>
  );
}
