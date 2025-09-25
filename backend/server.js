// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----- Cloudinary setup -----
// Make sure you set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Render
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use multer-storage-cloudinary so multer uploads directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "locked-images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    resource_type: "image",
  },
});
const upload = multer({ storage });

// In-memory "DB" map (id -> { url, price })
// For production you should use a real DB (Postgres, MongoDB, etc.)
const images = {};

// ----- Razorpay setup -----
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----- Routes -----

// Health
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

// Upload route: accepts multipart/form-data field "image" and price
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const id = Date.now().toString();
    // multer-storage-cloudinary sets req.file.path to the remote URL
    images[id] = {
      url: req.file.path || req.file.location || req.file.secure_url,
      price: req.body.price || "0",
    };
    return res.json({ id });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// Get image meta
app.get("/api/image/:id", (req, res) => {
  const image = images[req.params.id];
  if (!image) return res.status(404).json({ error: "Not found" });
  res.json(image);
});

// Create Razorpay order for an image
app.post("/api/pay/:id", async (req, res) => {
  try {
    const image = images[req.params.id];
    if (!image) return res.status(404).json({ error: "Image not found" });

    const amountPaise = Math.round(Number(image.price) * 100);
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      payment_capture: 1,
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID, // public key id
      amount: order.amount,
      currency: order.currency,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Verify payment (backend computes HMAC and compares)
app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const generated = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // You can store payment record here (DB) and mark image as unlocked for buyer
    res.json({ success: true });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// Serve a small diagnostics route to list stored images (for quick debug)
app.get("/api/list-images", (req, res) => {
  res.json(images);
});

// Start server (Render provides PORT)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
