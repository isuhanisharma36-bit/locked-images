import express from "express"
import cors from "cors"
import multer from "multer"
import Razorpay from "razorpay"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors())
app.use(express.json())

// Multer (memory storage, so we send file buffer to Cloudinary)
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Database (in-memory for now)
const images = {}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Routes
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "locked-images",
    })

    const id = Date.now().toString()
    images[id] = {
      url: uploadResponse.secure_url,
      price: req.body.price,
    }

    res.json({ id })
  } catch (err) {
    console.error("Cloudinary Upload Error:", err)
    res.status(500).json({ error: "Upload failed" })
  }
})

app.get("/api/image/:id", (req, res) => {
  const image = images[req.params.id]
  if (!image) return res.status(404).send("Not found")
  res.json(image)
})

app.post("/api/pay/:id", async (req, res) => {
  const image = images[req.params.id]
  if (!image) return res.status(404).send("Not found")

  try {
    const order = await razorpay.orders.create({
      amount: image.price * 100,
      currency: "INR",
      payment_capture: 1,
    })

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      orderId: order.id,
    })
  } catch (err) {
    console.error("Razorpay Error:", err)
    res.status(500).json({ error: "Payment failed" })
  }
})

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)
