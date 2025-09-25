import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors())
app.use(express.json())

// Setup __dirname (for ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'backend/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// Database (in-memory for now)
const images = {}

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
  const id = Date.now().toString()
  images[id] = {
    filename: req.file.filename,
    price: req.body.price
  }
  res.json({ id })
})

app.get('/api/image/:id', (req, res) => {
  const image = images[req.params.id]
  if (!image) return res.status(404).send('Not found')
  res.json(image)
})

app.post('/api/pay/:id', async (req, res) => {
  const image = images[req.params.id]
  if (!image) return res.status(404).send('Not found')

  const order = await razorpay.orders.create({
    amount: image.price * 100,
    currency: 'INR',
    payment_capture: 1
  })

  res.json({
    key: process.env.RAZORPAY_KEY_ID,
    amount: order.amount,
    orderId: order.id
  })
})

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
