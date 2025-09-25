import React, { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function Upload() {
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState("")
  const [link, setLink] = useState("")

  const handleUpload = async () => {
    if (!file || !price) {
      alert("Please select a file and enter price")
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    formData.append("price", price)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      setLink(`${window.location.origin}/l/${res.data.id}`)
    } catch (err) {
      console.error(err)
      alert("Upload failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Upload & Lock Image
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full mb-4 text-sm text-gray-700"
        />

        <input
          type="number"
          placeholder="Price in INR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition"
        >
          Upload
        </button>

        {link && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6"
          >
            <p className="text-gray-600">Share this link:</p>
            <a
              href={link}
              className="text-indigo-600 font-medium underline break-words"
            >
              {link}
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
