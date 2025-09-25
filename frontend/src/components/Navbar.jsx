import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          🔒 LockedImages
        </Link>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors font-medium"
          >
            Upload
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition-colors font-medium"
          >
            About
          </Link>
        </div>

        {/* Button */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://razorpay.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
        >
          💳 Payments
        </motion.a>
      </div>
    </motion.nav>
  );
}
