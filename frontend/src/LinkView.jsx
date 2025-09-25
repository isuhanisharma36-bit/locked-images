import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function LinkView() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/image/${id}`)
      .then(res => setData(res.data))
      .catch(() => alert('Image not found'))
  }, [id])

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/pay/${id}`
      )

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: 'INR',
        name: 'LockedImages',
        description: 'Unlock Image',
        order_id: res.data.orderId,
        handler: function () {
          setUnlocked(true)
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert('Payment failed')
    }
  }

  if (!data) return <p>Loading...</p>

  return (
    <div>
      <h2>Locked Image</h2>
      {!unlocked ? (
        <div>
          <p>Price: ₹{data.price}</p>
          <button onClick={handlePayment}>Pay & Unlock</button>
        </div>
      ) : (
        <div>
          <p>Unlocked 🎉</p>
          <img
            src={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/uploads/${data.filename}`}
            alt="Unlocked"
            style={{ maxWidth: '400px' }}
          />
        </div>
      )}
    </div>
  )
}
