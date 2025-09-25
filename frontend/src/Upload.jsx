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
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Upload & Lock Image
      </h2>
      <input
        type="file"
        className="mb-4 w-full text-gray-700"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="number"
        placeholder="Price in INR"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Upload
      </button>

      {link && (
        <motion.div
          className="mt-6 p-4 bg-green-100 border rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-800">✅ Share this link:</p>
          <a
            href={link}
            className="text-blue-600 hover:underline break-all"
          >
            {link}
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}
