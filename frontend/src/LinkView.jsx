import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Always point to your live backend
const API = import.meta.env.VITE_API_URL || "https://locked-images-1.onrender.com";

export default function LinkView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load image details
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/image/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        alert("Image not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Handle Razorpay payment
  const handlePayment = async () => {
    try {
      const orderRes = await axios.post(`${API}/api/pay/${id}`);
      const { key, amount, currency, orderId } = orderRes.data;

      const options = {
        key,
        amount,
        currency,
        name: "Locked Images",
        description: "Unlock image",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Verify payment with backend
            await axios.post(`${API}/api/verify-payment`, response);
            setUnlocked(true);
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Payment verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Locked Image</h2>
      {!unlocked ? (
        <>
          <p>Price: ₹{data.price}</p>
          <button onClick={handlePayment}>Pay & Unlock</button>
        </>
      ) : (
        <>
          <p>Unlocked!</p>
          <img
            src={`${API}/uploads/${data.filename}`}
            alt="Unlocked"
            style={{ maxWidth: "100%" }}
          />
        </>
      )}
    </div>
  );
}
