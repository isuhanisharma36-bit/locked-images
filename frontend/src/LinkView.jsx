import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"

export default function LinkView() {
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/image/${id}`)
      .then((res) => setImage(res.data))
      .catch(() => alert("Image not found"))
  }, [id])

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/pay/${id}`
      )

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: "INR",
        order_id: res.data.orderId,
        handler: function () {
          setUnlocked(true)
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert("Payment failed")
    }
  }

  if (!image) return <p className="text-gray-700">Loading...</p>

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Locked Image</h2>
      {!unlocked ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="mb-4 text-gray-700">
            Price: <strong>₹{image.price}</strong>
          </p>
          <button
            onClick={handlePayment}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Pay & Unlock
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <img
            src={image.url || `${import.meta.env.VITE_API_URL}/uploads/${image.filename}`}
            alt="Unlocked"
            className="max-w-full rounded-lg shadow-lg mx-auto"
          />
        </motion.div>
      )}
    </motion.div>
  )
}
