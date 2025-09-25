import { Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-md shadow-lg">
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition">
          🔒 Locked Images
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300 transition">Upload</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/l/:id" element={<LinkView />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 bg-black/20 backdrop-blur-md text-sm">
        Built with ❤️ using React, Tailwind & Razorpay
      </footer>
    </div>
  );
}
