// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import LinkView from "./LinkView";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center px-6">
            <h1 className="text-xl font-bold text-indigo-600">
              🔒 Locked Images
            </h1>
            <nav className="flex gap-4">
              <Link
                to="/"
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Upload
              </Link>
              <Link
                to="/view"
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                View Link
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/view" element={<LinkView />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Locked Images · Built with ❤️
        </footer>
      </div>
    </Router>
  );
}
