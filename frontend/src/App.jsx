// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";

function Nav() {
  return (
    <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">🔒 Locked Images</div>
        <span className="text-sm text-gray-300">pay-to-unlock</span>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-blue-300">Upload</Link>
        <Link to="/" className="hover:text-blue-300">Home</Link>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Nav />
        <main className="p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/l/:id" element={<LinkView />} />
            <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
