import { motion } from "framer-motion"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Upload from "./Upload"
import LinkView from "./LinkView"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <Router>
        <motion.div
          className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            🔒 Locked Images
          </h1>
          <nav className="flex justify-center space-x-6 mb-6">
            <Link
              to="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
            >
              Upload
            </Link>
            <Link
              to="/l/test"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
            >
              View
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/l/:id" element={<LinkView />} />
          </Routes>
        </motion.div>
      </Router>
    </div>
  )
}
