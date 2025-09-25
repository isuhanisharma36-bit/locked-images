import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function Failure() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-rose-600 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-6xl">❌</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong with your payment. Please try again.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  )
}
