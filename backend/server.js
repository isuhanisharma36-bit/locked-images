import express from "express";
import cors from "cors";
import multer from "multer";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// In-memory database
const images = {};

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay config
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Upload Route
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "locked-images",
    });

    fs.unlinkSync(req.file.path); // remove local temp file

    const id = Date.now().toString();
    images[id] = {
      url: result.secure_url,
      price: req.body.price,
    };

    res.json({ id });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Get Single Image
app.get("/api/image/:id", (req, res) => {
  const image = images[req.params.id];
  if (!image) return res.status(404).send("Not found");
  res.json(image);
});

// ✅ Payment Route
app.post("/api/pay/:id", async (req, res) => {
  const image = images[req.params.id];
  if (!image) return res.status(404).send("Not found");

  try {
    const order = await razorpay.orders.create({
      amount: image.price * 100,
      currency: "INR",
      payment_capture: 1,
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      orderId: order.id,
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Payment failed" });
  }
});

// ✅ Gallery Route (fetch all images)
app.get("/api/images", (req, res) => {
  const allImages = Object.values(images);
  res.json(allImages);
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
