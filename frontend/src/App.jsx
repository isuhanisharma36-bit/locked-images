// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col items-center p-6">
        <nav className="mb-8 flex gap-4">
          <Link
            to="/"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            Upload
          </Link>
          <Link
            to="/view"
            className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            View Link
          </Link>
        </nav>

        <div className="flex-grow flex items-center justify-center w-full">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/view" element={<LinkView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
