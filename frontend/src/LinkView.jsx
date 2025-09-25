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
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    console.error(err)
    alert("Payment failed")
  }
}
