# 🔒 Locked Images

A pay-to-unlock image sharing platform.  
Upload an image → set a price → share the link → the recipient must pay via Razorpay before unlocking the image.

---

## ⚙️ Features
- Upload and lock images with a price
- Generate shareable link
- Payment integration via **Razorpay**
- Unlock full image after successful payment
- Simple JSON-based database (can be replaced with PostgreSQL/MongoDB)
- Supports payouts to uploaders via RazorpayX (future extension)

---

## 🏗️ Project Structure

---

## 🚀 Local Setup

### 1. Clone Repo
```bash
git clone https://github.com/YOUR_USERNAME/locked-images.git
cd locked-images
cd backend
cp .env.example .env   # add Razorpay test keys
npm install
npm start
cd ../frontend
npm install
npm start
PORT=4000
HOST=https://your-backend.onrender.com
RAZORPAY_KEY_ID=your_test_key
RAZORPAY_KEY_SECRET=your_test_secret
PLATFORM_NAME=LockedImages
REACT_APP_API_URL=https://your-backend.onrender.com

---

