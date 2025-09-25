import { useParams } from "react-router-dom";
import axios from "axios";

export default function LinkView() {
  const { id } = useParams();

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment`, {
        amount: 5000, // ₹50
        imageId: id, // send imageId to backend
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "Locked Images",
        description: "Unlock your image",
        order_id: res.data.id,
        handler: function () {
          // Redirect to success page with image id
          window.location.href = `/success?id=${id}`;
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
