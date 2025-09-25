import React, { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || "https://locked-images-1.onrender.com";

export default function Upload() {
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState('')
  const [link, setLink] = useState('')

  const handleUpload = async () => {
    if (!file || !price) {
      alert('Please select a file and enter price')
      return
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('price', price)

    try {
      const res = await axios.post(
        `${API}/api/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      // backend returns { id }
      setLink(`${window.location.origin}/l/${res.data.id}`)
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    }
  }

  return (
    <div>
      <h2>Upload & Lock Image</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <br />
      <input
        type="number"
        placeholder="Price in INR"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>

      {link && (
        <div>
          <p>Share this link:</p>
          <a href={link}>{link}</a>
        </div>
      )}
    </div>
  )
}
