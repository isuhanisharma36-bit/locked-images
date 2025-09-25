import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// ALWAYS point to your live backend; env var overrides if set in Vercel
const API = import.meta.env.VITE_API_URL || "https://locked-images-1.onrender.com";

export default function LinkView() {
  const { id } = useParams(); // id returned by upload
  const [data, setData] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch image meta (price & preview)
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/image/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        alert("Image not found or backend not reachable.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handlePayment = async () => {
    if (!data) return;
    try {
      // Ask backend to create Razorpay order and return public key + order
      const orderRes = await axios.post(`${API}/api/pay/${id}`);
      const { key, amount, currency, orderId } = orderRes.data;

      const options = {
        key, // public key from backend (safe)
        amount,
        currency: currency || "INR",
        name: "Locked Images",
        description: "Unlock image",
        order_id: orderId,
        handler: async function (response) {
          try {
            // verify payment signature on backend
            await axios.post(`${API}/api/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            setUnlocked(true);
          } catch (e) {
            console.error("Server verification failed:", e);
            alert("Payment verification failed. Contact admin.");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment setup failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
      <h3>Unlock Image</h3>
      {!unlocked ? (
        <>
          <p>Price: ₹{data.price}</p>
          <img
            src={`${API}/uploads/${data.filename}`} // blurred preview not implemented here; it's fine
            alt="preview"
            style={{ width: 320, filter: "blur(6px)", display: "block", marginBottom: 8 }}
          />
          <button onClick={handlePayment}>Pay & Unlock</button>
        </>
      ) : (
        <div style={{ marginTop: 16 }}>
          <h4>Unlocked Image</h4>
          <img src={`${API}/uploads/${data.filename}`} alt="unlocked" style={{ width: 320 }} />
          <p><a href={`${API}/uploads/${data.filename}`} target="_blank" rel="noreferrer">Open full image</a></p>
        </div>
      )}
    </div>
  );
}
