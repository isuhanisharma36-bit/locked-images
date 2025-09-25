import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"

export default function LinkView() {
  const { id } = useParams()
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/image/${id}`
        )
        setImage(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchImage()
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
          window.location.href = "/success"
        },
        modal: {
          ondismiss: function () {
            window.location.href = "/failure"
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", function () {
        window.location.href = "/failure"
      })
      rzp.open()
    } catch (err) {
      console.error(err)
      window.location.href = "/failure"
    }
  }

  if (!image) return <p className="text-center mt-20">Loading...</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Locked Image</h2>
        <p className="mb-4 text-gray-600">
          Pay ₹{image.price} to unlock this image
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-md transition"
        >
          Pay Now
        </button>
      </motion.div>
    </div>
  )
}
