export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-green-400 mb-4">✅ Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your payment. Your image is now unlocked.</p>
      <a
        href="/"
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
      >
        Go to Upload Page
      </a>
    </div>
  );
}
