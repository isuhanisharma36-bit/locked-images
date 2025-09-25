import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

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

// Create Razorpay order
app.post('/api/pay/:id', async (req, res) => {
  try {
    const image = images[req.params.id];
    if (!image) return res.status(404).send('Not found');

    const order = await razorpay.orders.create({
      amount: Math.round(Number(image.price) * 100),
      currency: 'INR',
      payment_capture: 1
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      orderId: order.id
    });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// (Optional but safer) Verify Razorpay payment signature
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('Payment verification error:', err)
    res.status(500).json({ error: 'Verification failed' })
  }
})

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
