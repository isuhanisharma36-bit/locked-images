import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Upload from './Upload'
import LinkView from './LinkView'

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>🔒 Locked Images</h1>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Upload</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/l/:id" element={<LinkView />} />
      </Routes>
    </div>
  )
}
